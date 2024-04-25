import { useState } from 'react'
import './App.css';
import WeatherPage from "./components/WeatherPage";
import CitySelector from "./components/CitySelector";

export default function App() {

  return (
    <>
    <div className='container'>
      <div className='weather'>
        <WeatherPage />
      </div>
    </div>
    </>
  );
}
