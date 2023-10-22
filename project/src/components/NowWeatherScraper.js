import React, { useEffect } from 'react';
import axios from 'axios';

import { token1 } from '../token';
import TodayWeatherScraper from './TodayWeatherScraper';

export default function NowWeatherScraper(props) {
    const [nowweather, setNowWeather] = React.useState([]);

    city = props.city

    // console.log("city" + city)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token1}&units=metric&lang=ru`;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setNowWeather(response.data);
                // console.log(response.data);
            })
            .catch(error => { console.log(error) })
    }, [url]);

    // console.log(nowweather);

    return (
        <React.Fragment>
            <hr />
            <h1>Сейчас</h1>
            <h2>Город: {nowweather.name}</h2>
            {nowweather.main ? <p>Температура: {nowweather.main.temp.toFixed()} °C</p> : null}
            {nowweather.weather ? <p>Небо: {nowweather.weather[0].description}</p> : null}
            {nowweather.main ? <p>Как будто: {nowweather.main.feels_like.toFixed()} °C</p> : null}
            {nowweather.main ? <p>Влажность: {nowweather.main.humidity} %</p> : null}
            {nowweather.wind ? <p>Скорость ветра: {nowweather.wind.speed.toFixed()} MPH</p> : null}
            <hr />
            {nowweather.coord ? <TodayWeatherScraper coord={nowweather.coord} /> : null}
        </React.Fragment>
    )
}