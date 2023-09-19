import React, { useState } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { toFahrenheit } from "../helpers";

export const ForecastCard = ({
  day,
  icon,
  temp,
  windSpeed,
  humidity,
  highTemp,
  lowTemp,
}) => {
  const [unit, setUnit] = useState("C");

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  return (
    <div className="forecast-card">
      <h3 className="text-xl">{day}</h3>
      <div className="weather-icon">{icon}</div>

      <p className="mt-2 text-5xl">
        {unit === "C" ? temp : toFahrenheit(temp)}°
        <span onClick={toggleUnit} className="text-sm cursor-pointer ml-2">
          {unit === "C" ? "C | F" : "F | C"}
        </span>
      </p>
      <div className="flex justify-center mt-2">
        <p> {unit === "C" ? temp : toFahrenheit(lowTemp)}° |</p>
        <p className="ml-2"> {unit === "C" ? temp : toFahrenheit(highTemp)}°</p>
      </div>

      <div className="flex justify-between mt-7">
        <p className="flex items-center">
          <WiStrongWind className="mr-1" fontSize={35} /> {windSpeed} km/h
        </p>
        <p className="flex items-center">
          <WiHumidity className="mr-1" fontSize={35} /> {humidity}%
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;
