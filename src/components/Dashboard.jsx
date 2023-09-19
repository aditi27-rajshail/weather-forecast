import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ForecastCard from "./ForecastCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_KEY } from "../config";
import { FaSun } from "react-icons/fa";
import { weatherIconMapping } from "../helpers/WeatherIcon";

const Dashboard = () => {
  const [forecasts, setForecasts] = useState([]);
  const [query, setQuery] = useState("");

  const fetchWeatherData = async () => {
    const geoEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;

    try {
      const geoResponse = await fetch(geoEndpoint);
      const geoData = await geoResponse.json();

      if (geoData.cod === "404") {
        toast.error(geoData.message);
        return;
      }

      if (!geoData.coord) {
        toast.error("Unexpected error occurred.");
        return;
      }

      if (geoData) {
        const { lat, lon } = geoData.coord;
        const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastEndpoint);
        const forecastData = await forecastResponse.json();
        if (forecastData.cod === "404") {
          toast.error(forecastData.message);
          return;
        }

        const dailyForecasts = forecastData.list
          .filter((entry) => {
            const date = new Date(entry.dt * 1000);
            return date.getUTCHours() === 12;
          })
          .slice(0, 3);
        const formattedData = dailyForecasts.map((entry) => {
          return {
            day: new Date(entry.dt * 1000).toLocaleString("default", {
              weekday: "long",
            }),
            icon: weatherIconMapping[entry.weather[0].icon] || (
              <FaSun size={32} color="orange" />
            ),
            temp: Math.round(entry.main.temp),
            highTemp: Math.round(entry.main.temp_max),
            lowTemp: Math.round(entry.main.temp_min),
            windSpeed: Math.round(entry.wind.speed),
            humidity: Math.round(entry.main.humidity),
          };
        });

        setForecasts(formattedData);
      } else {
      }
    } catch (error) {
      toast.error("Failed to fetch data. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      fetchWeatherData();
    }
  };

  return (
    <>
      <section>
        <div className="mt-16">
          <form
            className="relative flex justify-center items-center"
            onSubmit={handleSubmit}>
            <input
              className="place_input peer"
              placeholder="Search City or Zipcode"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="submit_btn ">
              <FaSearch />
            </button>
          </form>
        </div>
      </section>

      <div className="forecast-container">
        {forecasts.map((forecast, index) => (
          <ForecastCard key={index} {...forecast} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
