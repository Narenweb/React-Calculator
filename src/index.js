// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss'; // Import global SASS styles
import Calculator from './components/Calculator';

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);
