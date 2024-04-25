import { useState, useEffect } from "react";
import "./CitySelector.css";

export default function CitySelector({setCurrentCity}){
    let goSearch = true;
    const [cityList, setCityList] = useState([]);
    const cityDataList = cityList.map((city, index) => {
        const cityText = city.name + ", " + city.country;

        return (
            <option key={index}>{cityText}</option>
        );
    });

    return (
        <>
            <label>Enter City: </label>
            <input onKeyUp={(e) => citySearch(e.target.value)} onInput={(e) => setWeather(e)} list="cities" className="selector" type="search" size={15}></input>
            <datalist id="cities">{cityDataList}</datalist>
        </>
    );

    function setWeather(event){
        if(event.nativeEvent.inputType == null || event.nativeEvent.inputType == "insertReplacementText"){
            if(event.target.value.length > 0) {
                const choice = event.target.value.split(", ");
                const chosenCity = cityList.find((city) => city.name == choice[0] && city.country == choice[1]);
                console.log(chosenCity);
                setCurrentCity(chosenCity);
                event.target.value = "";
            }
        }
    }

    function citySearch(searchString){
        if(searchString.length > 2 && goSearch){
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchString}&count=20&language=en&format=json`).then((res) => res.json())
            .then((obj) => {
                if(obj != null && obj.results.length > 0) setCityList(obj.results);
            });
        }
        setTimeout(() => {
            goSearch = true;
        }, 300);
    }
}