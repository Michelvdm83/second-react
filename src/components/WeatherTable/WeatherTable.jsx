import { useEffect, useState } from "react";
import "./WeatherTable.css";

export default function WeatherTable({currentWeatherData}) {
    const [currentWeather, setCurrentWeather] = useState(null);
    
    useEffect(() => {
        if(currentWeatherData != null){
            console.log(currentWeatherData);
            const hourly = currentWeatherData.hourly.time.map((time, index) => {
                const dateTime = new Date(time);
                return <tr key={time}><td>{dateTime.toLocaleString()}</td><td>{currentWeatherData.hourly.temperature_2m[index]}</td></tr>;
            });
            console.log(hourly);
            setCurrentWeather(hourly);
        }
    }, [currentWeatherData]);
    return (
        <table id="weather-table">
            <caption>°C per hour</caption>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>°C</th>
                </tr>
            </thead>
            <tbody id="table-body">{currentWeather}</tbody>
        </table>
    );
}