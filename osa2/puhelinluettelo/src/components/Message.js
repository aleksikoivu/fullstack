import React from 'react';
import '../index.css'

const Notification = (props) => {
    if (props.Notification === null && props.errorMessage === null){
        return null
    }
    
  return( 
    <div>
      <li className='notification'>{props.Notification}</li>
      <li className='error'>{props.errorMessage}</li>
    </div>
  )
}

export default Notification;