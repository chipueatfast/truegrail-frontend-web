import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import { initWeb3Provider } from '~/singletons/web3Provider';
import './App.css';

async function start() {
    await initWeb3Provider();
    ReactDOM.render(<App />, document.getElementById('root'));
}

start();
