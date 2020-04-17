import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
 return(
   <div>
    {props.anecdotes}<br></br>
    Votes: {props.votes} 
   </div>
 )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // Usestatena uusi array, pituutena anekdootien pituus ja täytetään nollilla
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [best, setBest] = useState([0,0])
 
  function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max));
  } 

  const randomAnecdote = () =>{
    setSelected(getRandomInt(props.anecdotes.length))
   }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    // Tein tähän samaan parhaan anekdootin tarkastelun
    const bestcopy = [...best]
    if(copy[selected] > best[0]){
      // Ekaan alkioon suurin äänimäärä
      bestcopy[0] = copy[selected]
      // Toiseen indeksin arvo
      bestcopy[1] = selected 
      setBest(bestcopy)
    }
   }
  
  return (
    <div>
      <h1>Random anecdote</h1>
      <Display anecdotes={props.anecdotes[selected]} votes = {votes[selected]}/>
      <Button handleClick = {randomAnecdote} text="Random anecdote" />
      <Button handleClick = {vote} text="Vote" />
      <h1>Best anecdote</h1>
      <Display anecdotes={props.anecdotes[best[1]]} votes = {votes[best[1]]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)