import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  // Tyhjä taulukko
  const [allClicks, setAll] = useState([])
  // Concatilla (ei muuta olemassaolevaa taulukkoa vaan luo kopion) L jos painetaan vasenta namikkaa
  const handleLeftClick = () => {setAll(allClicks.concat('L'))
  setLeft(left + 1)  }
  // Concatilla R jos painetaan oikeeta namikkaa
  const handleRightClick = () => {setAll(allClicks.concat('R'))
  setRight(right + 1)  }

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks} />      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)