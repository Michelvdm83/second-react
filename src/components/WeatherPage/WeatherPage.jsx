import { useState, useEffect } from "react";
import WeatherTable from "../WeatherTable/WeatherTable";
import WeatherChart from "../WeatherChart/WeatherChart";
import CitySelector from "../CitySelector/CitySelector";
import "./WeatherPage.css";

export default function WeatherPage() {
    const [currentCity, setCurrentCity] = useState(null);
    const current = currentCity === null? "Welcome" : currentCity.name;

    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    
    useEffect(() => {
        if(currentCity != null){
            const currentLong = currentCity.longitude;
            const currentLat = currentCity.latitude;
            fetch("https://api.open-meteo.com/v1/forecast?latitude=52.0533&longitude=5.2806&hourly=temperature_2m&timezone=Europe%2FBerlin&past_hours=1&forecast_days=1&forecast_hours=24").then((res) => res.json())
                .then((obj) => {
                    setCurrentWeatherData(obj);
                });
        }
    }, [currentCity]);

    return (
    <div className="page">
        <h1>{current}</h1>
        <div className="item1">
            <CitySelector className="item1" setCurrentCity={setCurrentCity}/>
        </div>
        <div className="item-flex">
            <div className="item">
            <WeatherTable currentWeatherData={currentWeatherData}/>
            </div>
            <div className="item1">
            <WeatherChart currentWeatherData={currentWeatherData}/>
            </div>
        </div>
    </div>);
}