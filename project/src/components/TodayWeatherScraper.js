import React, { useEffect } from 'react';
import axios from 'axios';

import { token1 } from '../token';

export default function TodayWeatherScraper(props) {
    const [todayweather, setTodayWeather] = React.useState([]);

    const latitude = props.coord.lat
    const longitude = props.coord.lon

    // console.log("latitude: " + latitude, "longitude: " + longitude);

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${token1}&cnt=12&units=metric&lang=ru`;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setTodayWeather(response.data.list);
                // console.log(response.data.list);
            })
            .catch(error => { console.log(error) })
    }, []);

    // console.log(todayweather);

    return (
        <React.Fragment>
            <h1>Следующий 12 часов</h1>
            {todayweather ? todayweather.map(
                (weather, index) => (
                    <p key={index}>
                        Дата и Время: {weather.dt_txt} <br />
                        Температура: {weather.main.temp} °C<br />
                        Небо: {weather.weather[0].description} <br />
                        Как будто: {weather.main.feels_like} °C<br />
                        Влажность: {weather.main.humidity} % <br />
                        Скорость ветра: {weather.wind.speed} MPH <br /><br />
                    </p>
                )
            ) : null}
        </React.Fragment>
    )
}