const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

loginRouter.post('/', async(req,res) =>{
    const body = req.body

    // Etsitään käyttäjä, vertaillaan bcrypt.comparella salasanaa hashiin
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    // Jos käyttäjä/pw väärä -> 401 unauthorized
    if(!(user && passwordCorrect)){
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    // jos salasana oikein, luodaan jwt.sign avulla token
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res
        .status(200)
        .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter