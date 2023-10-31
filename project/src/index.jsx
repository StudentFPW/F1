import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

/* Строка `import 'bootstrap/dist/css/bootstrap.css';` импортирует файл CSS для платформы Bootstrap.
Это позволяет приложению использовать предварительно определенные стили и компоненты,
предоставляемые Bootstrap. */
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';

/* Этот код создает корневой элемент с помощью ReactDOM.createRoot() и отображает приложение React
внутри него. */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
