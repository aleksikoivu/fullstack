import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Määrittele komponentti
const Button = (props) => {
  // Sit tässä on se mitä button varsinaisesti palauttaa
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const StatisticsLine = (props) => {
  return(
    // Note to self, taulukolle pitää antaa body, tr(row) ja td(dimensio)
    <tbody>
    <tr>
      <td>{props.text} : {props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  // Laskureiden palautus
  const average = props.average/props.total
  const positive = props.good/props.total
   if(props.total === 0){
     return(
       <div>
       Statistics yeat to be added
       </div>
     )
   } 
   return(
     <table>
      <StatisticsLine text="Good" value={props.good}/>
      <StatisticsLine text="Neutral" value={props.neutral}/>
      <StatisticsLine text="Bad" value={props.bad}/>
      <StatisticsLine text="Total" value={props.total}/>
      <StatisticsLine text="Average" value={average}/>
      <StatisticsLine text="Positive" value={positive}/>
     </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [counter, setCounter] = useState(0)
  const [average, setAverage] = useState(0)

  // handleClicks
  const positiveFeedback = () => {
    setGood(good+1)
    setCounter(counter+1)
    setAverage(average+1)
    //console.log("Positive feedback")
}
  const neutralFeedback = () => {
    setNeutral(neutral+1)
    setCounter(counter+1)
    //console.log("Neutral feedback")
  }
  const negativeFeedback = () => {
    setBad(bad+1)
    setCounter(counter+1)
    setAverage(average-1)
    //console.log("Negative feedback")
  }
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={positiveFeedback} text="Good"/>
      <Button handleClick={neutralFeedback} text="Neutral"/>
      <Button handleClick={negativeFeedback} text="Bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} bad ={bad} neutral = {neutral} total = {counter} average={average}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)