const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const { response } = require('express')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Kopataan authorization headerista
// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization')
//     if(authorization && authorization.toLowerCase().startsWith('bearer ')){
//         return authorization.substring(7)
//     }
//     return null
// }

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username : 1, name: 1})
    res.json(blogs.map(blog => blog.toJSON()))
    
})

blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog) { res.json(blog.toJSON()) } 
    else { res.status(404).end() }
})

blogRouter.post('/', async (req,res) => {
    const token = req.token
    if(!token){
        return res.status(401).json({ error: 'token missing'})
    }
    const body = req.body
    if(!body.likes){
        body.likes = 0
    }

    // Tokenin oikeellisuus jwt.verifyllä, joka dekoodaa tokenin ja palauttaa olion jonka perusteella se on luotu (username, id)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return res.status(401).json({ error: 'token invalid' })
    }

    // kopataan user id bodyn rungosta
    const user = await User.findById(decodedToken.id)
    // if (!user){ // jos ei määritelty niin otetaan vain joku
    //     user = await User.findOne({username: 'Piripetteri30'})
    // }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    // tallennetaan se blogi
    const savedBlog = await blog.save()
    
    // lisätään userin blogeihin se tallennetun blogin id
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog.toJSON())
})


blogRouter.delete('/:id', async (req, res) => {
    const token = req.token
    if(!token){
        res.status(401).json({ error: 'no token'})
    }
    const body = req.body

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        res.status(401).json({ error: 'token invalid' })
    }

    const toBeDeleted = await Blog.findById(req.params.id)
    if(!toBeDeleted){
        res.status(404).end
    }

    if(toBeDeleted.user.toString() === decodedToken.id){
        await Blog.findByIdAndRemove(req.params.id)
        res.json({ message: 'User successfully deleted'})
    } else{
        res.status(401).json({ error: 'Unauthorized to delete post'})
    }

    // await Blog.findByIdAndRemove(req.params.id)
    // res.status(204).end()
})

blogRouter.put('/:id', async(req, res) => {
    const blog = { likes: req.body.likes }
    updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    res.json(updatedBlog)
}) 

blogRouter.delete('/', async(req,res) => {
    await Blog.deleteMany({})
    res.status(204).end()
})


module.exports = blogRouter