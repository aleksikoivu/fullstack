const router = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const { response } = require('express')

router.post('/reset', async(req,res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).end()
})

module.exports = router