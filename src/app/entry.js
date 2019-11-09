import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import './App.css';

async function start() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

start();
