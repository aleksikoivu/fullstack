import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// api key 9696232abba9dba5ee3666e10dd2e768
// api endpoint http://api.weatherstack.com/

// Current Weather API Endpoint

//http://api.weatherstack.com/current
    // ? access_key = YOUR_ACCESS_KEY //tähän siis api key
    // & query = New York
    
// var YOUR_ACCESS_KEY = "9696232abba9dba5ee3666e10dd2e768";
// optional parameters: 

    // & units = m
    // & language = en
    // & callback = MY_CALLBACK


const FilterCountries = (props) => {
  return(
    <div>Search countries: 
      <input onChange = {props.Filter}/>
    </div>
    )
}

const PrintCountries = (props) => {
  var matches = props.data.length
  //console.log(props.data.length)
  //console.log(props.data[0])

  if(matches > 10){ // Jos liikaa vastaavuuksia (tää ok)
    return(
      <div>Too many matches, please specify another filter </div>
    )
  }

  else if(matches < 10 && matches > 1){ //jos alle 10 mutta yli 1 (tiedot tänne)
    return(
      <div>
        {props.data.map(country=> 
        <ul key={country.id}>
          {country.name} <button value={country.name} onClick={props.showMoreHandle} >Show more</button>
        </ul>)}
      </div>
    )
  }


  // maa h1, pk & population, kielet & lippu
  else if(matches === 1){ // jos 1 vastaavuus (maa yksityiskohtaisesti tänne)
    const content = props.data.map(country =>
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
      </div>)

    // console.log(props.data)
    // console.log(props.data[0].capital) //tää on se kutsu jolla saa pk ulos
      
    // ajetaan semi epäortodoksista(?) reittiä sääinfot :D

    props.weather(props.data[0].capital) 


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
  const [weatherData, setWeatherData] = useState([])

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

  const weatherQuery = (city) => {
    const params = {
      access_key: '9696232abba9dba5ee3666e10dd2e768',
      query: city
    }
    var access_key = "9696232abba9dba5ee3666e10dd2e768"
    // kaikista parastahan tässä on ehkä se että kumpikaan noista axios geteistä ei toimi yksin, mutta yhdessä kyllä
    Axios.get('http://api.weatherstack.com/current?access_key='+access_key+"&query="+city)
    Axios.get('http://api.weatherstack.com/current', {params})
    .then(response=>{
      console.log(response.data)
      const w = response.data
      setWeatherData(w)
    })
    
    // //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    // const params = {
    //     appid: '1c7640f8d629370f45fda3b23a7b8844',
    //     q: city
    //   }
    // var id = '1c7640f8d629370f45fda3b23a7b8844'
    // var query = 'London'
    // Axios.get('api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=1c7640f8d629370f45fda3b23a7b8844')
    // .then(response=>{
    //   console.log(response.data)
    // }) 
  }

  // const testi = (event) => {
  //   console.log("triggered")
  //   // Axios.get('http://api.weatherstack.com/current?access_key=9696232abba9dba5ee3666e10dd2e768&query=New%20York'
  //   // )
  //   // .then(response => {
  //   //   console.log("Promise fulfilled")
  //   //   console.log(response.data)
  //   // })
  //   weatherQuery("Helsinki")
  // }

  return (
    <div>
      <h2>Countries</h2>

      <FilterCountries Filter={Filter}/>

      <PrintCountries weatherData={weatherData} data={countriesToShow} showMoreHandle={Filter} weather={weatherQuery} />

      {/* <button onClick={testi}>klikki</button> */}
    
    </div>
  )

}

export default App