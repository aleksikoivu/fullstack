import React, { useState } from 'react';
// import Filter from './components/Filter';


const Filter = (props) => {
  return( 
    <div>Filter phonebook by:
      <input onChange = {props.filter}/>
    </div>
  )
}

const NewPerson = (props) => {
  return(
    <form onSubmit={props.submit}>
    <div>
      Name: <input 
        value={props.name}
        onChange={props.nameChange}/>
    </div>
    <div>
      Number: <input
        value={props.number}
        onChange={props.numberChange}/>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
  )
 }


const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number:"040 491 247" },
    { name: 'Mikki Hiiri', id: 2, number:"021 231 123" },
    { name: 'Teppo Tulppu', id: 3, number: "123 888 666"}])
  const [ newName, setNewName ] = useState('Etunimi Sukunimi')
  const [ newNumber, setNewNumber ] = useState('040 123 123')
  const [ personsToShow, setPersonsToShow ] = useState(persons)

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
      id: persons.length +1,
      number: newNumber
    }
    // tarkastus sille että onko nimi jo listassa
    let found = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())
    // console.log(found)
    // found ei palauta undefinediä eli henkilö löytyy
    if(found !== undefined){
      alert(`${newName} is already in the phonebook`)
    }
    // muussa tapauksessa (found===undef) eli henkilöä ei löydy
    else{
    // uuden henkilön lisääminen taulukkoon
    setPersons(persons.concat(nameObject))

    setNewName('')
    setNewNumber('')
    //console.log(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={applyFilter}/>

      <NewPerson name = {newName} number = {newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} submit={addName}/>

      <h2>Numbers</h2>
      

    <div>
      {
      personsToShow.map(persons=>
      <ul key={persons.id}>
        {persons.name} {persons.number}
      </ul>
      )}
    </div>


    </div>
  )

}

export default App