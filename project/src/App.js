import React from "react";
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

import WeekWeatherScraper from "./components/WeekWeatherScraper";
import Search from "./components/Search";

export default function App() {
  return (
    <React.Fragment>
      <Switch>

        {/* Не самый лучший вариант 😶‍🌫️ - Можно было через query */}
        <Route path='/weekweather/:lat/:lon/'>
          <WeekWeatherScraper />
        </Route>

        <Route path='/'>
          <Search />
        </Route>

      </Switch>
    </React.Fragment>
  );
}
