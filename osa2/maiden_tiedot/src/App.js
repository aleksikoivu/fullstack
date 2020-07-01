import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const weatherApiKey = process.env.REACT_APP_API_KEY

const weatherQuery = async (city) => {
  //console.log('weather queryssä')
  //console.log(city)
  const params = {
    access_key: weatherApiKey,
    query: city
  }

  const response = await Axios.get('http://api.weatherstack.com/current',{params})
  // const response = await Axios.get('http://api.weatherstack.com/current?access_key='+params.access_key+'&query='+params.city)
  console.log(response.data)

  const temperature = response.data.current.temperature
  return temperature
}

const Weather = (props) => {
  const [weather, setWeather] = useState([])

  var capital = props.capital
  weatherQuery(capital).then(result => setWeather(result))
  

  if(weather === undefined){
    return( 
      <div>Loading</div>
    )
  }else{
    const temperature = weather
    return(
      <div>Temperature: {temperature}</div>

    )
  }
  
}

const FilterCountries = (props) => {
  return(
    <div>Search countries: 
      <input onChange = {props.Filter}/>
    </div>
    )
}

const PrintCountries = (props) => {
  var matches = props.data.length
  var content = null
  //console.log(props.data.length)
  //console.log(props.data[0])

  if(matches > 10){ // Jos liikaa vastaavuuksia (tää ok)
    return(
      <div>Too many matches, please specify another filter </div>
    )
  }

  else if(matches < 10 && matches > 1){ //jos alle 10 mutta yli 1 (tiedot tänne)
    content = props.data.map(country => 
      <ul key={country.id}>
        {country.name} <button value={country.name} onClick={props.showMoreHandle} >Show more</button>
      </ul>)
    
    return(
      <div>{content}</div>
    )
  }

  // maa h1, pk & population, kielet & lippu
  else if(matches === 1){ // jos 1 vastaavuus (maa yksityiskohtaisesti tänne)
    content = props.data.map(country =>
      <div key={country.id}>
        <h1>{country.name}</h1>
        <ul>Capital - {country.capital}</ul>
        <ul>Population - {country.population}</ul>
        <h1>Languages</h1>
        
        {country.languages.map(language=>
        <ul key={language.id}>
          {language.name}
        </ul>)}
      
        <picture>
          <img src={country.flag} widht="350" height="250" alt="flag"></img>
        </picture>

        <Weather capital={country.capital}/>
      </div>)

    return(
      <div>
        {content}
      </div>
      
    )
  }
  else{
    return(
      <div>Nothing found</div>
    )
  }

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    console.log("effect")
    Axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log("promise fulfilled")
      setCountries(Object.values(response.data)) // Objekti piti näköjään entryttää
      setCountriesToShow(Object.values(response.data))
      //console.log(typeof(response))
    })
  },[])

  const Filter = (event) => {
    event.preventDefault()
    console.log("triggered")

    var query = event.target.value
    // Jos kyselyllä sisältyöä
    if(event.target.value){
      //console.log("kyselyssä on tavaraa")
      //console.log(countries[0])
      var _countriesToShow = countries.filter(function(country){
        return !country.name.toLowerCase().indexOf(query.toLowerCase())
      });setCountriesToShow(_countriesToShow)
      //console.log(_countriesToShow)
    }
    else{
      console.log("kyselyssä ei ole tavaraa")
      setCountriesToShow(countries)
    }
  }



  //   var access_key = weatherApiKey
  //   // kaikista parastahan tässä on ehkä se että kumpikaan noista axios geteistä ei toimi yksin, mutta yhdessä kyllä
  //   Axios.get('http://api.weatherstack.com/current?access_key='+access_key+"&query="+city)
  //   Axios.get('http://api.weatherstack.com/current', {params})
  //   .then(response=>{
  //     console.log(response.data)
  //     const w = response.data
  //     setWeatherData(w)
  //   })
  // }
    // Current Weather API Endpoint
//http://api.weatherstack.com/current
    // ? access_key = YOUR_ACCESS_KEY //tähän siis api key
    // & query = New York
// optional parameters: 
    // & units = m
    // & language = en
    // & callback = MY_CALLBACK
  
  return (
    <div>
      <h2>Countries</h2>

      <FilterCountries Filter={Filter}/>

      <PrintCountries data={countriesToShow} showMoreHandle={Filter} />

      {/* <button onClick={testi}>klikki</button> */}
    
    </div>
  )

}

export default App