import React from "react";
import "./currentWeather.css";

interface WeatherData {
  city: string;
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
}


interface CurrentWeatherProps {
  data: WeatherData | null;
  city:WeatherData |null
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div
      title="current weather"
      className="weatherCard"
      style={{
        backgroundImage: `url("/${data.weather[0].description
          .toLowerCase()
          .replace(" ", "-")}.png")`,
      }}
    >
      <div className="backgroundOverlay"></div>
      <div className="weatherCardTop">
        <div>
          <p className="cityName">
            {data.name}, {data.sys.country}
          </p>
          <p className="weatherDescription">
            {data.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="weatherIcon"
          src={`/icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="weatherCardBottom">
        <p className="temperatureDisplay">{Math.round(data.main.temp)}°C</p>
        <div className="weatherDetails">
          <div className="weatherParameterRow">
            <span className="weatherParameterLabel">Feels like</span>
            <span className="weatherParameterValue">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="weatherParameterRow">
            <span className="weatherParameterLabel">Max Temp</span>
            <span className="weatherParameterValue">{data.main.temp_max}°C</span>
          </div>
          <div className="weatherParameterRow">
            <span className="weatherParameterLabel">Min Temp</span>
            <span className="weatherParameterValue">{data.main.temp_min}°C</span>
          </div>
          <div className="weatherParameterRow">
            <span className="weatherParameterLabel">Wind</span>
            <span className="weatherParameterValue">{data.wind.speed} m/s</span>
          </div>
          <div className="weatherParameterRow">
            <span className="weatherParameterLabel">Humidity</span>
            <span className="weatherParameterValue">{data.main.humidity}%</span>
          </div>
          <div className="weatherParameterRow">
            <span className="weatherParameterLabel">Pressure</span>
            <span className="weatherParameterValue">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
