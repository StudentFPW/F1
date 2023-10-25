import React, { useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'

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
    }, [url]);

    // console.log(todayweather);

    return (
        <React.Fragment>
            <Table stripped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th width="190">Дата и Время</th>
                        <th width="190">Температура</th>
                        <th width="190">Небо</th>
                        <th width="190">Как будто</th>
                        <th width="190">Влажность</th>
                        <th width="190">Скорость ветра</th>
                    </tr>
                </thead>
                <tbody>
                    {todayweather ? todayweather.map((weather) => (
                        <tr>
                            <td>{weather.dt_txt}</td>
                            <td>{weather.main.temp} °C</td>
                            <td>{weather.weather[0].description}</td>
                            <td>{weather.main.feels_like} °C</td>
                            <td>{weather.main.humidity} %</td>
                            <td>{weather.wind.speed} КМ</td>
                        </tr>
                    )) : null}
                </tbody>
            </Table>
        </React.Fragment>
    )
}