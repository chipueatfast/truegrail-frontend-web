import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import RouterGuard from 'react-router-guard';
import routerConfig from './routes/config';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <RouterGuard config={routerConfig}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
