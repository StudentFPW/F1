import React, { useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import { token1 } from '../token';
import withRouter from './withRouter/withRouter';

function WeekWeatherScraper(props) {
    const [weekweather, setWeekWeather] = React.useState([]);

    const latitude = props.params.lat
    const longitude = props.params.lon

    // console.log("latitude: " + latitude, "longitude: " + longitude);

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${token1}&cnt=100&units=metric&lang=ru`;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setWeekWeather(response.data.list);
                // console.log("setWeekWeather: " + response.data.list);
            })
            .catch(error => { console.log(error) })
    }, [url]);

    // console.log("weekweather: " + weekweather);

    return (
        <React.Fragment>
            <Table bordered hover variant="dark" size="sm" stripped="true">
                <thead>
                    <tr>
                        <th width="170">Дата и Время</th>
                        <th width="170">Температура</th>
                        <th width="170">Небо</th>
                        <th width="170">Как будто</th>
                        <th width="170">Влажность</th>
                        <th width="170">Скорость ветра</th>
                    </tr>
                </thead>
                <tbody>
                    {weekweather ? weekweather.map((weather, index) => (
                        <tr key={index}>
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
            <a href="/" rel="noreferrer">
                <Button variant="warning">← Назад</Button>
            </a>
        </React.Fragment>
    )
}

export default withRouter(WeekWeatherScraper);