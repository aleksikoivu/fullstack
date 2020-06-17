const express = require('express')
const app = express()
const PORT = 3000;
let notes = []

app.get('/',(req,res)=>{
    res.send("Hello world!")
})

app.get('/api/persons',(req,res)=>{
    res.send("Persons")
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})