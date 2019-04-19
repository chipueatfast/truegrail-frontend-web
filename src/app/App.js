import React, { Component } from 'react';
import { Router } from 'react-router-dom'; 
import RouterGuard from 'react-router-guard';
import history from '~/utils/history';
import headerConfig from '~/routes/header';
import routerConfig from '../routes/config';
import { UniversalNotice, UniversalModal }from '~/universal-components';
// import { DrizzleProvider } from 'drizzle-react'; 
// import contractStore from './contracts/contractStore';
// import drizzleOptions from './contracts/drizzleOptions';
import './App.css';

class App extends Component {
  render() {
    return (
      // <DrizzleProvider store={contractStore} options={drizzleOptions}>
        <div className="App">
          <Router history={history}>
            <RouterGuard config={headerConfig} />
          </Router>
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
