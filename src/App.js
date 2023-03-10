import React from 'react'
import {fetchWeather} from './fetchWeather'
import './App.css'
import { useEffect } from 'react'
import "./animation.css"


const App = () => {

    const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

    
    const [query, setQuery] = React.useState('');
    const [weather, setWeather] = React.useState({});
    const [error, setError] = React.useState('');

    const search = async(e) => {
        
        if (e.key === 'Enter') {
            const data = await fetchWeather(query); 
            setWeather(data);
            setQuery('');//clears the search bar
        }
            
        
    }

  return (

    <div className='container'>
        {loading ? (
        <div className="loader-container">
            <div className="spinner"></div>
         </div>
      ) : (

    <div className='main-container'>
        <input
            type={'text'}
            className={'search'}
            placeholder={'Search for a city...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
        />
        {weather.main && (
            <div className={'city'}>
                <h2 className={'city-name'}>
                    <span>{weather.name}</span>
                    <sup>{weather.sys.country}</sup>
                </h2>
                <div className={'city-temp'}>
                    {Math.round(weather.main.temp)}
                    <sup>&deg;C</sup>
                </div>
                <div className={'info'}>
                    <img
                        className={'city-icon'}
                        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                        alt={weather.weather[0].description}
                    />
                    <p>{weather.weather[0].description}</p>
            </div>
            </div>
        )}
    

    </div>
        )}
    </div>
  )
}

export default App