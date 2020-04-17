import React from 'react'
import ReactDOM from 'react-dom'
// 1,1 1,2 1,3 1,4 1,5

const Header = (props) => {
  // Kurssin nimen renteröinti
  return(
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}


const Content = (props) =>{
  // Kurssit ja tehtävämäärät
  return(
    <div>
      <Part name={props.part[0].name} exercises={props.part[0].exercises}/>
      <Part name={props.part[1].name} exercises={props.part[1].exercises}/>
      <Part name={props.part[2].name} exercises={props.part[2].exercises}/>
    </div>
  )
}

const Part = (props) =>{
  return(
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        {props.total}
      </p>
    </div>
  )
}

const App = () => {

  const course = {
    name: "Half Stack application development",
    parts:[
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises 

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts}/>
      <Total total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))