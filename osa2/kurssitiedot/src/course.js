import React from 'react'

const Course = (props) => {
  //console.log(props)
  return(
    //  <div>{props.course.name}</div>
      <div>
        <Header header={props.course.name}/>
        <Content content={props.course.parts}/>
      </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.header}</h1>
  )
}

const Content = (props) => {

  // jos arvot on taulukossa objekteina niin tarvii antaa initialvalue
  let initialValue = 0 
  let total = props.content.reduce(function(accumulator,currentValue){
    return accumulator + currentValue.exercises
  },initialValue)

  // today i learned: pitää ottaa propsit omaan muuttujaan mappia varten
  let course_contents = props.content

  return(

    <div>
      <ul>
        {course_contents.map((course_contents,i) =>
        <Part key={course_contents.id} part={course_contents}/>
        )}
      <b>Total exercises: {total}</b>
      </ul>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>{props.part.name} {props.part.exercises}</div>
  )
}

export default Course