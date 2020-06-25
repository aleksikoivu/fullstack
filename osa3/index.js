require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//const { response } = require('express');
const app = express()
const PORT = process.env.PORT || 3001
// const mongoose = require('mongoose')
const numberModel = require('./models/phonebook')

morgan.token('person',(req) => {
    return JSON.stringify(req.body)
})


app.use(express.static('build'))

app.use(cors())
app.use(express.json())
app.use(morgan(function(tokens,req,res){
    return[
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res, 'content-lenght'), '-',
        tokens['response-time'](req,res),'ms',
        tokens.person(req,res)
    ].join(' ')
}))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    // console.log("error name: ", error.name)
    // console.log("error message: ", error.message)
    // console.log("------------------------")
    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'Malformatted id' })
    }
    if(error.name === 'ValidationError'){
        console.log('Validation error napattu')
        return response.status(400).json({ error: error.message })
    }
    next(error)
}


app.get('/',(req,res) => {
    //console.log("GET /")
    res.send('Hello world!')
})

app.get('/info', async(req,res,next) => {
    //console.log("GET /info")
    const dateNow = new Date()
    var notesLenght = ''
    notesLenght = await numberModel.countDocuments()
        .then(count => {
        //console.log(count)
            notesLenght = count
            return notesLenght
        })
        .catch(error => next(error))
    console.log(notesLenght)
    //const notesLenght = notes.length
    //console.log(notes[0].persons.length)
    //console.log(dateNow)

    res.send(`Phonebook has info for ${notesLenght} people. <br> ${dateNow}`)
    //res.send("Hello from info")
})

app.get('/api/persons',(req,res,next) => {
    //console.log("GET /api/persons")
    //res.json(notes)
    numberModel.find({})
        .then(notes => {
            res.json(notes)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id',(req,res,next) => {
    //console.log("GET /api/persons/:id")
    numberModel.findById(req.params.id)
        .then(result => {
            if(result){
                res.json(result)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {

    const person = new numberModel({
        name: req.body.name,
        number: req.body.number
    })

    // tarkastus sille onko POST requestissa sisältöä
    if(!req.body.name || !req.body.number){
        console.log('error - body or number missing')
        res.status(400).json({ error:'Body or number missing' })
    }
    else{
        person.save().then(savedPerson => {
            res.json(savedPerson)
        })
            .catch(error => next(error))
    }
    //console.log(notes)
})

app.put('/api/persons/:id',(req,res,next) => {
    console.log('PUT /api/persons/:id')
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }

    numberModel.findByIdAndUpdate(req.body.id, person, { new:true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id',(req,res,next) => {
    console.log('DELETE /api/persons/:id')
    //const id = Number(req.params.id)

    numberModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
    // notes = notes.filter(person=>person.id !== id) //palautetaan siis kaikki joiden id ei täsmää
    // console.log("person under id: ",id,"deleted")
    // //console.log(person)
    // res.status(204).end()

})

app.use(errorHandler)
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})