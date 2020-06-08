import React from 'react';

const Filter = (props) => {
  return( 
    <div>Filter phonebook by:
      <input onChange = {props.filter}/>
    </div>
  )
}

export default Filter