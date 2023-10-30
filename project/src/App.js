import React from "react";
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

import WeekWeatherScraper from "./components/WeekWeatherScraper";
import Search from "./components/Search";

/**
 * Функция экспортирует компонент React, который отображает различные компоненты в зависимости от пути
 * маршрута.
 * @returns Компонент App возвращает элемент JSX. Он использует компонент React.Fragment для упаковки
 * своих дочерних элементов. Внутри React.Fragment есть компонент Switch, который используется для
 * условного рендеринга различных компонентов на основе текущего URL-пути.
 */
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
