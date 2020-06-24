import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import ShowPersons from './components/ShowPersons'
import NewPerson from './components/NewPerson'
import Notification from './components/Message'
//import Axios from 'axios';
import personService from './services/persons'

//npx json-server --port=3001 --watch db.json

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('Etunimi Sukunimi')
  const [ newNumber, setNewNumber ] = useState('040 123 123')
  const [ personsToShow, setPersonsToShow ] = useState([])
  const [ message, setMessage] = useState()
  const [ errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    console.log("effect")
    // Axios.get('http://localhost:3001/persons')
    // .then(response => {
    //   console.log("promise fulfilled")
    //   setPersons(response.data)
    //   setPersonsToShow(response.data)
    personService.getAll()
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
      setPersonsToShow(response.data)
    })
  },[])

  const applyFilter = (event) => {
    console.log(event.target.value)
    var query = event.target.value 
    // Jos annetaan kyselyyn jotain sisältöä
    if(event.target.value){
    var _personsToShow = persons.filter(function(person){
      return !person.name.toLowerCase().indexOf(query.toLowerCase())
    });setPersonsToShow(_personsToShow) // Niin asetetaan se filtteri personstoshowille
    }
    // Muussa tapauksessa se on vain persons lista
    else(setPersonsToShow(persons))
    console.log(personsToShow)
  }
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    // uuden nimiolion luonti
    const nameObject = {
      name: newName,
      //id: Math.floor(Math.random()*1000),
      number: newNumber
    }
    // tarkastus sille että onko nimi jo listassa
    let found = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())
    // console.log(found)
    // found ei palauta undefinediä eli henkilö löytyy
    if(found !== undefined){
      const changedPerson = {...found, number: newNumber}
      //alert(`${newName} is already in the phonebook`)
      if(window.confirm(`Do you want to update ${newName}'s number?`)){
        console.log("update")
        personService.updatePerson(found.id, changedPerson)
        .then(response=>{
          console.log(response)
          personService.getAll()
          .then(response => {
            setPersons(response.data)
            setPersonsToShow(response.data)
            setMessage(`${changedPerson.name} number changed`)
            setTimeout(()=>{
              setMessage(null)
            }, 3000)
          })
        })
      }
    }
    // muussa tapauksessa (found===undef) eli henkilöä ei löydy
    else{
    // uuden henkilön lisääminen taulukkoon
    setPersons(persons.concat(nameObject))
    // pitäs varmaan saada joku päivitys tuolle listalle että se ilmestyy - check
    setPersonsToShow(persons.concat(nameObject))

    personService.create(nameObject)
    .then(response=>{
      console.log(response)
      console.log("added")
      setMessage(`${nameObject.name} added`)
      setTimeout(()=>{
        setMessage(null)
      }, 3000)
    })

    setNewName('')
    setNewNumber('')

    //console.log(persons)
    }
  }

  const deletePerson = (event) => {
    if(window.confirm(`Delete person?`)){
      //console.log("triggered again")
      console.log(event.target.value)
      //console.log(typeof(persons[0].id))
      //console.log(typeof(event.target.value))
      //haetaan se nimi vielä talteen
      //let found = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())
      let toBeDeleted = persons.find(person => person.id === parseInt(event.target.value))
      console.log("to be deleted = ",toBeDeleted)

      personService.deletePerson(event.target.value)
      .then(response => {
        console.log(response.data)
        console.log("deleted")
        personService.getAll()
        .then(response => {
          setPersons(response.data)
          setPersonsToShow(response.data)
          setMessage(`${toBeDeleted.name} deleted`)
          setTimeout(()=>{
            setMessage(null)
          }, 3000)
        })
      })
      .catch(error => {
        setErrorMessage(`${toBeDeleted.name} is already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
      })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification Notification={message} errorMessage={errorMessage}/>
      <Filter filter={applyFilter}/>

      <NewPerson name = {newName} number = {newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} submit={addName}/>

      <h2>Numbers</h2>

      <ShowPersons persons = {personsToShow} deleteP = {deletePerson}/>
    
    </div>
  )

}

export default App