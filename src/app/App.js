import React, { Component } from 'react';
import { Router } from 'react-router-dom'; 
import RouterGuard from 'react-router-guard';
import history from '~/utils/history';
import routerConfig from '../routes/config';
import { UniversalNotice, UniversalModal }from '~/universal-components';

import vansLogo from '~/assets/img/vans_logo.jpg';
// import { DrizzleProvider } from 'drizzle-react'; 
// import contractStore from './contracts/contractStore';
// import drizzleOptions from './contracts/drizzleOptions';
import './App.css';

class App extends Component {
  render() {
    return (
      // <DrizzleProvider store={contractStore} options={drizzleOptions}>
        <div className="App">
          <img src={vansLogo} 
            style={{
              height: 100,
              width: 100,
            }} 
            alt='logo'
          />
          <Router history={history}>
            <RouterGuard config={routerConfig}/>
          </Router>
          <UniversalNotice />
          <UniversalModal />
        </div>
      // </DrizzleProvider>
    );
  }
}

export default App;
