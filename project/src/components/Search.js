import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import NowWeatherScraper from './NowWeatherScraper';

export default class Search extends React.Component {
    state = {
        toDashboard: false,
    }

    /* Функция handleSubmit — это обработчик событий отправки формы. Когда форма отправляется, она
    предотвращает поведение отправки формы по умолчанию (которое может привести к обновлению страницы)
    путем вызова e.preventDefault(). */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(() => ({
            toDashboard: true
        }));
    }

    render() {
        if (this.state.toDashboard === true) {
            return <NowWeatherScraper city={document.getElementById('cityname').value} />
        }

        return (
            <div style={{
                margin: 'auto',
                display: 'block',
                width: 500,
                padding: 30,
                color: 'white',
                fontSize: '30px',
                backgroundColor: '#000000',
                borderRadius: 10,
                fontFamily: 'Arial',
            }}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Город:</Form.Label>
                        <Form.Control type="text" placeholder="Наберите город" id="cityname" />
                    </Form.Group><br />
                    <Button type="submit">
                        Отправить
                    </Button>
                </Form>
            </div>
        );
    }
}
