import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentWeather from "../components/current-weather/CurrentWeather";
import Forecast from "../components/forecast/Forecast";
import Spinner from "./Spinner";
import Navbar from "../components/Navbar";




const Spage = () => {
  const { geoid } = useParams<{ geoid?: string }>(); // Note the ? to indicate it's optional
  const [cityData, setCityData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
   const WEATHER_API_KEY = "8e16100c36cd3f8d18929681504951c3";
  
  useEffect(() => {
    if (geoid) {
      // Fetch city details by GeoID
      fetchCityData(geoid);
    }
  }, [geoid]);

  const fetchCityData = (geoid: string) => {
    // Fetch city details by GeoID
    fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=geoname_id%3A${geoid}&refine=timezone%3A%22Asia%22&refine=feature_code%3A%22PPL%22&lang=en&timezone=Asia%2FKolkata`
    )
      .then((response) => response.json())
      .then((data) => {
        setCityData(data.results[0]);
        // Extract latitude and longitude from city data

        const { lat, lon } = data.results[0].coordinates;
        // Fetch current weather and forecast using latitude and longitude
        fetchWeatherData(lat, lon);
      })
      .catch((error) => console.error("Error fetching city data:", error));
  };

  const fetchWeatherData = (lat: number, lon: number) => {
    // Fetch current weather data
    fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((weatherData) => setCurrentWeather(weatherData))
      .catch((error) =>
        console.error("Error fetching current weather:", error)
      );

    // Fetch forecast data
    fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((forecastData) => setForecast(forecastData))
      .catch((error) => console.error("Error fetching forecast data:", error));
  };

  if (!cityData)
    return (
      <>
        <Navbar />
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div>
          {currentWeather && (
            <CurrentWeather data={currentWeather} city={currentWeather}  />
          )}
          {forecast && <Forecast data={forecast} />}
        </div>
      </div>
    </>
  );
};

export default Spage;
