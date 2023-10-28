import React, { useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import { token1 } from '../token';

export default function NowWeatherScraper(props) {
    const [nowweather, setNowWeather] = React.useState([]);

    const city = props.city

    // console.log(city)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token1}&units=metric&lang=ru`;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setNowWeather(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                alert("Город введен неправильно")
                // console.log(error)
            })
    }, [url]);

    // console.log(nowweather);

    return (
        <React.Fragment>
            <Table stripped="true" bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th width="170">Локация</th>
                        <th width="170">Температура</th>
                        <th width="170">Небо</th>
                        <th width="170">Как будто</th>
                        <th width="170">Влажность</th>
                        <th width="170">Скорость ветра</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{nowweather.name}</td>
                        <td>{nowweather.main ? <p>{nowweather.main.temp.toFixed()} °C</p> : null}</td>
                        <td>{nowweather.weather ? <p>{nowweather.weather[0].description}</p> : null}</td>
                        <td>{nowweather.main ? <p>{nowweather.main.feels_like.toFixed()} °C</p> : null}</td>
                        <td>{nowweather.main ? <p>{nowweather.main.humidity} %</p> : null}</td>
                        <td>{nowweather.wind ? <p>{nowweather.wind.speed.toFixed()} КМ</p> : null}</td>
                    </tr>
                </tbody>
            </Table>

            {nowweather.coord ?
                <a href={`/weekweather/${nowweather.coord.lat}/${nowweather.coord.lon}/`} target="_blank" rel="noreferrer">
                    <Button variant="success">Недельный прогноз погоды →</Button>
                </a>
                :
                <a href="/" rel="noreferrer" title="Что бы вы хотели?">
                    <Button variant="warning">← Назад</Button>
                </a>
            }
        </React.Fragment >
    )
}