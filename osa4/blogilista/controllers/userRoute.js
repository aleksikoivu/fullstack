const bcrypt = require('bcrypt')
const userRoute = require('express').Router()
const User = require('../models/userModel')
const { response } = require('express')



userRoute.get('/', async(req,res) => {
    const users = await User.find({}).populate('blogs', { title : 1, likes: 1 })
    res.json(users.map(user => user.toJSON()))

})

userRoute.post('/', async (req,res) => {
    const body = req.body

    if(body.password.length < 4 || body.username.length < 4){
        return res.status(400).json({error: 'Username & password must be over 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)

})

userRoute.delete('/', async(req,res) => {
    await User.deleteMany({})
    res.status(204).end()
})

module.exports = userRoute