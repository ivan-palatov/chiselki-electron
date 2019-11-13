import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const font = document.createElement('link');
font.href =
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
font.rel = 'stylesheet';
document.head.appendChild(font);

ReactDOM.render(
  // <BrowserRouter>
  <App />,
  // </BrowserRouter>,
  document.getElementById('app')
);
