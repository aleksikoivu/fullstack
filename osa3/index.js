const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { response } = require('express');
const app = express()
const PORT = process.env.PORT || 3001;

morgan.token('person',(req,res)=>{
    return JSON.stringify(req.body)
})

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

let notes = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
  ]

app.get('/',(req,res)=>{
    //console.log("GET /")
    res.send("Hello world!")
})

app.get('/info',(req,res) =>{
    //console.log("GET /info")
    const dateNow = new Date()
    const notesLenght = notes.length
    //console.log(notes[0].persons.length)
    console.log(dateNow)
    res.send(`Phonebook has info for ${notesLenght} people. <br> ${dateNow}`)
    //res.send("Hello from info")
})

app.get('/api/persons',(req,res)=>{
    //console.log("GET /api/persons")
    res.json(notes)
})

app.get('/api/persons/:id',(req,res)=>{
    //console.log("GET /api/persons/:id")
    const id = Number(req.params.id)
    person = notes.find(person => person.id === id)
    if(person){
        res.json(person)
    }
    else{
        res.send("404 - Person not found")
    }
})

app.post('/api/persons', (req,res) =>{
    //console.log("POST /api/persons")

    const person = {
        name : req.body.name,
        number : req.body.number,
        id : Math.floor(Math.random()*1000)
    }
    // tarkastus sille onko POST requestissa sisältöä
    if(!req.body.name || !req.body.number){
        console.log("error - body or number missing")
        res.status(400).json({
            error:'error - body or number missing'
        })
    }
    else{
        // tarkistus sille onko nimi jo käytössä
        found = notes.find(person => person.name.toLocaleLowerCase() === req.body.name.toLocaleLowerCase())
        if(!found){
            //console.log(person)
            notes = notes.concat(person)
            // console.log(notes)
            res.status(201).json(person)
        }
        else{
            console.log("error - name taken")
            res.status(400).json({
                error: 'error - name is already taken'
            })
        }
    }
    //console.log(notes)
})

app.delete('/api/persons/:id',(req,res)=>{
    console.log("DELETE /api/persons/:id")
    const id = Number(req.params.id)
    notes = notes.filter(person=>person.id !== id) //palautetaan siis kaikki joiden id ei täsmää
    console.log("person under id: ",id,"deleted")
    //console.log(person)
    res.status(204).end()

})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})