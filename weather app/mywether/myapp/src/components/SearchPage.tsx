import React, { useState } from "react";
import Search from "./search/Search";
import CurrentWeather from "./current-weather/CurrentWeather";
import Forecast from "./forecast/Forecast";

import "../App.css";
import Navbar from "./Navbar";

interface Location {
  label: string;
  value: string;
}

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  city:any
}


function SearchPage() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any | null>(null);
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>(
    JSON.parse(localStorage.getItem("favoriteLocations") || "[]")
  );
  const  WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
   const WEATHER_API_KEY = "148839248e1798fa4c03d61c3a212170";
  

  const handleOnSearchChange = (searchData: Location) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        // Save favorite location to local storage
        saveFavoriteLocation(searchData.label, searchData.value);
      })
      .catch(console.log);
  };

  const saveFavoriteLocation = (label: string, value: string) => {
    const newFavoriteLocations = [...favoriteLocations, { label, value }];
    setFavoriteLocations(newFavoriteLocations);
    localStorage.setItem(
      "favoriteLocations",
      JSON.stringify(newFavoriteLocations)
    );
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} city={currentWeather}  />}

        {forecast && <Forecast data={forecast} />}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">History</h2>
        <ul>
          {favoriteLocations.map((location, index) => (
            <li key={index}>
              {location.label} ({location.value})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchPage;
