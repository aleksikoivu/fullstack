import React from 'react';

const ShowPersons = (props) => {
    return(
      <div>
        {props.persons.map(person=>
          <ul key={person.id}>
            {person.name} - {person.number} - <button onClick={props.deleteP} value={person.id}>Klikkaa mua boii</button>
          </ul>)}
      </div>
     )
   }

export default ShowPersons