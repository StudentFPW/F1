import React, { useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import { token1 } from '../token';

/**
 * Функция NowWeatherScraper — это компонент React, который извлекает и отображает текущую информацию о
 * погоде для данного города с помощью API OpenWeatherMap.
 * @param props - Параметр props — это объект, содержащий свойства, передаваемые компоненту
 * NowWeatherScraper. Доступ к этим свойствам можно получить с помощью точечной записи, например
 * «props.city».
 * @returns Функция NowWeatherScraper возвращает фрагмент React, содержащий таблицу с информацией о
 * погоде и кнопку. В таблице отображается местоположение, температура, описание погоды, ощущения от
 * температуры, влажности и скорости ветра. Кнопка позволяет пользователю перейти на страницу
 * еженедельного прогноза погоды, если доступны координаты текущей погоды, в противном случае она
 * перенаправляет пользователя обратно на домашнюю страницу.
 */
export default function NowWeatherScraper(props) {
    const [nowWeather, setNowWeather] = React.useState([]);

    const city = props.city;

    // console.log(city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token1}&units=metric&lang=ru`;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setNowWeather(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                alert("Город введен неправильно");
                // console.log(error);
            })
    }, [url]);

    // console.log(nowWeather);

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
                        <td>{nowWeather.name}</td>
                        <td>{nowWeather.main ? <p>{nowWeather.main.temp.toFixed()} °C</p> : null}</td>
                        <td>{nowWeather.weather ? <p>{nowWeather.weather[0].description}</p> : null}</td>
                        <td>{nowWeather.main ? <p>{nowWeather.main.feels_like.toFixed()} °C</p> : null}</td>
                        <td>{nowWeather.main ? <p>{nowWeather.main.humidity} %</p> : null}</td>
                        <td>{nowWeather.wind ? <p>{nowWeather.wind.speed.toFixed()} КМ</p> : null}</td>
                    </tr>
                </tbody>
            </Table>

            {nowWeather.coord ?
                <a href={`/weekweather/${nowWeather.coord.lat}/${nowWeather.coord.lon}/`} target="_blank" rel="noreferrer">
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