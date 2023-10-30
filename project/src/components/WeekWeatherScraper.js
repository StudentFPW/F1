import React, { useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import { token1 } from '../token';
import withRouter from './withRouter/withRouter';

function WeekWeatherScraper(props) {
    const [weekWeather, setWeekWeather] = React.useState([]);

    const latitude = props.params.lat;
    const longitude = props.params.lon;

    // console.log("latitude: " + latitude, "longitude: " + longitude);

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${token1}&cnt=40&units=metric&lang=ru`;

    const weatherCollector = (response) => {
        let dateAndWeather = {};
        let onlyWeather = [];
        for (let i in response.data.list) {
            const date = response.data.list[i].dt_txt.slice(0, 10);
            const weather = response.data.list[i];
            dateAndWeather[date] = weather;
        }
        for (let i in dateAndWeather) {
            onlyWeather.push(dateAndWeather[i]);
        }
        // console.log(dateAndWeather);
        // console.log(onlyWeather);
        setWeekWeather(onlyWeather);
    };

    useEffect(() => {
        axios.get(url)
            .then(response => {
                weatherCollector(response);
            })
            .catch(error => {
                alert("Что-то пошло не так!");
            })
    }, [url]);

    // console.log(weekWeather);

    return (
        <React.Fragment>
            <Table bordered hover variant="dark" size="sm" stripped="true">
                <thead>
                    <tr>
                        <th width="170">Дата</th>
                        <th width="170">Температура</th>
                        <th width="170">Небо</th>
                        <th width="170">Как будто</th>
                        <th width="170">Влажность</th>
                        <th width="170">Скорость ветра</th>
                    </tr>
                </thead>
                <tbody>
                    {weekWeather ? weekWeather.map((weather, index) => (
                        <tr key={index}>
                            <td>{weather.dt_txt.slice(0, 10)}</td>
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