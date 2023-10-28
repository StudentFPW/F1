import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Geocoder from 'react-native-geocoding';

import 'bootstrap/dist/css/bootstrap.css';

import NowWeatherScraper from './NowWeatherScraper';
import { google_token } from '../token';

Geocoder.init(google_token);

export default class Search extends React.Component {
    state = {
        toDashboard: false,
        location: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(() => ({
            toDashboard: true,
            location: document.getElementById('cityname').value,
        }));
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("Геолокация не поддерживается этим браузером.");
        }
    }

    // Если координаты отличаются попробуйте подключить свое устройство к мобильному интернету.
    showPosition = (position) => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
                var addressComponent = json.results[0].address_components[3].long_name;
                document.getElementById('geolocation').innerHTML = addressComponent
                // console.log(addressComponent);
            })
            .catch(error => console.warn(error));
    }

    render() {
        if (this.state.toDashboard === true && this.state.location) {
            return <NowWeatherScraper city={this.state.location} />
        }

        return (
            <React.Fragment>
                <div style={{
                    margin: 'auto',
                    display: 'block',
                    width: 500,
                    padding: 30,
                    color: 'black',
                    fontSize: '30px',
                    backgroundColor: 'lightslategray',
                    borderRadius: 10,
                    fontFamily: 'Arial',
                }}>
                    <h6>Если координаты отличаются попробуйте подключить свое устройство к мобильному интернету.</h6>
                    <hr />
                    <div id='geolocation'></div>
                    <Button variant="warning" onClick={this.getLocation}>Найти автоматически</Button>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Город:</Form.Label>
                            <Form.Control type="text" placeholder="Наберите город" id="cityname" />
                        </Form.Group><br />
                        <Button variant="success" type="submit">
                            Отправить
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}
