const Blog = require('../models/blogModel')
const User = require('../models/userModel')

//title author url likes
const initialBlogs = [
    {
        title: 'Automated test run',
        author: 'Aleksi Koivu',
        url: 'No-can-do.co.uk',
        likes: 100
    },
    {
        title: 'Test run number two',
        author: 'Koleksi Aivu',
        url: 'www.google.fi',
        likes: 20
    },
]

// const noContentBlog = async() => {
//     const blog = new Blog({})
//     await blog.save()
//     await blog.remove()

//     return noContentBlog._id.toString()
// }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs,
    // noContentBlog,
    blogsInDb,
    usersInDb
}