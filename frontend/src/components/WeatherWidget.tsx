import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BsFillCloudFog2Fill} from "react-icons/bs";
import {BsFillSunFill, BsCloudyFill, BsFillCloudRainFill} from 'react-icons/bs';
import {IoIosThunderstorm, IoIosPartlySunny} from "react-icons/io";
import {FaRegSnowflake} from "react-icons/fa";


function WeatherWidget() {
    const api_key = import.meta.env.VITE_API_KEY;
    const api_Endpoint = import.meta.env.VITE_API_ENDPOINT;
    const [weatherData, setWeatherData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Funktion för att hämta väderdata
    const fetchWeatherData = async () => {
        const url = `${api_Endpoint}weather?lat=59.363117&lon=17.959755&appid=${api_key}&units=metric`;
        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Uppdaterar klockan varje sekund
    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    // Hämtar väderdata vid komponentens mount
    useEffect(() => {
        fetchWeatherData();
    }, []);

    const iconChanger = (weather: string) => {
        let iconElement: React.ReactNode;
        let iconColor: string;

        switch (weather) {
            case "Rain":
                iconElement = <BsFillCloudRainFill />;
                iconColor = "#A9A9A9";
                break;

            case "Clear":
                iconElement = <BsFillSunFill />;
                iconColor = "#ffaa01";
                break;

            case "Clouds":
                iconElement = <BsCloudyFill />;
                iconColor = "#A9A9A9";
                break;

            case "Mist":
                iconElement = <BsFillCloudFog2Fill />;
                iconColor = "#A9A9A9";
                break;

            case "Thunderstorm":
                iconElement = <IoIosThunderstorm />;
                iconColor = "#A9A9A9";
                break;

            case "Snow":
                iconElement = <FaRegSnowflake />;
                iconColor = "#FFFFFF";
                break;

            default:
                iconElement = <IoIosPartlySunny />;
                iconColor = "#A9A9A9";
        }

        return (
            <span className="icon" style={{ color: iconColor }}>
            {iconElement}
        </span>
        );
    };


    // Widget-komponenten som ska visas
    return (
        <div className="widget-compact-view"> {/* Använda klassen från globalStyles.scss */}
            {weatherData && (
                <>
                    <span className="temp">{weatherData.main.temp.toFixed(0)}°C</span>
                    <span className="icon-wrapper">{iconChanger(weatherData.weather[0].main)}</span>
                    <span className="weather-description">{weatherData.weather[0].main}</span>
                    <span className="time">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </>
            )}
        </div>
    );
}

export default WeatherWidget;

