import React, { useState } from 'react';

import NowWeatherScraper from './NowWeatherScraper';

export default function Search() {
    const [city, setCity] = useState('');

    const onChange = (event) => {
        setCity(event.target.value);
        // console.log(event.target.value);
    };

    return (
        <React.Fragment>
            <div>Набираемый город: {city}</div>
            <input value={city} onChange={onChange} />
            <NowWeatherScraper city={city} />
        </React.Fragment>
    );
}