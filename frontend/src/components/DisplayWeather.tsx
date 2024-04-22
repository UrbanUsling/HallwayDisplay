import React, { useState, useCallback } from 'react';
import { MainWrapper, WidgetCompactView } from './styles.module.ts';
import { TbGps } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { BsFillCloudFog2Fill, BsWind } from "react-icons/bs";
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill } from 'react-icons/bs';
import {IoIosThunderstorm, IoIosPartlySunny} from "react-icons/io";
import { FaRegSnowflake } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import CustomInput from "./CustomInput.tsx";

interface WeatherDataProps {
  name: string;

  main: {
    temp: number,
    humidity: number,
  },
  sys: {
    country: string;
  },
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  }
}


function DisplayWeather() {

  const api_key = import.meta.env.VITE_API_KEY;
  const api_Endpoint = import.meta.env.VITE_API_ENDPOINT;
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [cachedWeatherData, setCachedWeatherData] = useState<WeatherDataProps | null>(null);
  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(null)
  const [searchCity, setSearchCity] = React.useState("");
  //const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [isCompactView, setIsCompactView] = useState(true);
  const toggleView = () => {
    setIsCompactView(!isCompactView);
  };

  const convertKmHtoMS = (speedInKmH: number): number => {
    return Math.round(speedInKmH / 3.6);
  };

  const fetchCurrentWeather = useCallback(async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  }, [api_key, api_Endpoint]);


  const fetchWeatherForUserLocation = async () => {
    const predefinedLat = 59.363117;
    const predefinedLon = 17.959755;
    try {
      const weatherData = await fetchCurrentWeather(predefinedLat, predefinedLon);
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data for predefined location:", error);
    }
  };



  const fetchWeatherData = async (city: string) => {
    const currentTime = Date.now();

    // Kontrollerar om det har gått mindre än 60 sekunder sedan den senaste framgångsrika förfrågan
    if (lastRequestTime && (currentTime - lastRequestTime < 60000)) {
      console.log("Använder cachad data på grund av ratelimit.");
      if (cachedWeatherData) {
        setWeatherData(cachedWeatherData);
        return;
      }
    }

    try {
      const response = await axios.get(`${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`);
      setWeatherData(response.data);
      setCachedWeatherData(response.data); // Uppdaterar cachad data med den senaste framgångsrika förfrågan
      setLastRequestTime(currentTime); // Uppdaterar tiden för den senaste framgångsrika förfrågan
    } catch (error) {
      console.error("Fel vid hämtning av väderdata:", error);
    }
  };


  const handleSearch = async () => {
    if (!searchCity.trim()) return;
    await fetchWeatherData(searchCity);
  };


  /*useEffect(() => {
    if (useCurrentLocation) {
      fetchWeatherForCurrentLocation();
    }
  }, [useCurrentLocation]);
  Denna hämtar för current location.
   */

  //Den här hämtar för fixed position
  React.useEffect(() => {
    const predefinedLat = 59.363117;
    const predefinedLon = 17.959755;

    const fetchData = async () => {
      try {
        const weatherData = await fetchCurrentWeather(predefinedLat, predefinedLon);
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching weather data for predefined location:", error);
      }
    };

    fetchData();
  }, [fetchCurrentWeather]);

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


  React.useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const [currentWeather] = await Promise.all([fetchCurrentWeather(latitude, longitude)]);
        setWeatherData(currentWeather);
      });
    };

    fetchData();
  }, [fetchCurrentWeather]);

  return (
    <>
      {isCompactView ? (
        <WidgetCompactView onClick={toggleView}>
          {weatherData && (
            <>
              <span className="temp">{weatherData.main.temp.toFixed(0)}°</span>
              <span className="iconWrapper">{iconChanger(weatherData.weather[0].main)}</span>
              <div className="weatherDataName">{weatherData.name}</div>
            </>
          )}
        </WidgetCompactView>
      ) : (
        <MainWrapper>
          <div className="weather-container">
            <div className="searchArea">
              <CustomInput
                type="text"
                placeholder="enter a city"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
              <div className="searchCircle">
                <IoMdSearch className="searchIcon" onClick={handleSearch} />
              </div>
              <TbGps className="locationIcon" onClick={fetchWeatherForUserLocation} />
            </div>

            {weatherData && (
              <>
                <div className="weatherArea" onClick={toggleView}>
                  <h1>{weatherData.name}</h1>
                  <span>{weatherData.sys.country}</span>
                  <div className="icon">
                    {iconChanger(weatherData.weather[0].main)}
                  </div>
                  <h1>{weatherData.main.temp.toFixed(0)}°</h1>
                  <div className='h2-alternative'>{weatherData.weather[0].main}</div>
                </div>

                <div className="bottomInfoArea">
                  <div className="humidityLevel">
                    <WiHumidity className="humidIcon" />
                    <div className="humidInfo">
                      <div className='h2-alternative'>{weatherData.main.humidity}%</div>
                      <p>Humidity</p>
                    </div>
                  </div>

                  <div className="wind">
                    <BsWind className="windIcon" />
                    <div className="windInfo">
                      <div className='h2-alternative'>{convertKmHtoMS(weatherData.wind.speed)} m/s</div> {/* Inget .toFixed() här */}
                      <p>Wind speed</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </MainWrapper>
      )}
    </>
  );
}

export default DisplayWeather;