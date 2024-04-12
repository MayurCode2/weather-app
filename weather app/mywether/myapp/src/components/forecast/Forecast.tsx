import React from "react";
import {
 Accordion,
 AccordionItem,
 AccordionItemHeading,
 AccordionItemButton,
 AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

interface WeatherData {
  list: {
    main: {
      temp_max: number;
      temp_min: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      feels_like: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
    };
  }[];
}

const WEEK_DAYS = [
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday",
 "Sunday",
];

const Forecast: React.FC<{ data: WeatherData }> = ({ data }) => {
 const dayInAWeek = new Date().getDay();
 const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
 );

 return (
    <>
      <div className="flex justify-center mt-6">
        <label htmlFor="forecast">
          <h2 className="text-xl font-semibold">Weather Forecast</h2>
        </label>
      </div>
      <div title="weather forecast" className="flex justify-center">
        <div className="w-[100%] sm:w-[60%] m-2">
          <Accordion className="duration-75" allowZeroExpanded>
            {data.list.splice(0, 7).map((item:any, idx:any) => (
              <AccordionItem key={idx}>
                <AccordionItemHeading>
                 <AccordionItemButton>
                    <div className="dailyItem">
                      <img
                        src={`/icons/${item.weather[0].icon}.png`}
                        className="iconSmall"
                        alt="weather"
                      />
                      <label className="day">{forecastDays[idx]}</label>
                      <label className="description">
                        {item.weather[0].description}
                      </label>
                      <label className="minMax">
                        {Math.round(item.main.temp_max)}°C /
                        {Math.round(item.main.temp_min)}°C
                      </label>
                    </div>
                 </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                 <div className="dailyDetailsGrid">
                    <div className="dailyDetailsGridItem">
                      <label>Pressure:</label>
                      <label>{item.main.pressure}</label>
                    </div>
                    <div className="dailyDetailsGridItem">
                      <label>Humidity:</label>
                      <label>{item.main.humidity}</label>
                    </div>
                    <div className="dailyDetailsGridItem">
                      <label>Clouds:</label>
                      <label>{item.clouds.all}%</label>
                    </div>
                    <div className="dailyDetailsGridItem">
                      <label>Wind speed:</label>
                      <label>{item.wind.speed} m/s</label>
                    </div>
                    <div className="dailyDetailsGridItem">
                      <label>Sea level:</label>
                      <label>{item.main.sea_level}m</label>
                    </div>
                    <div className="dailyDetailsGridItem">
                      <label>Feels like:</label>
                      <label>{item.main.feels_like}°C</label>
                    </div>
                 </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
 );
};

export default Forecast;
