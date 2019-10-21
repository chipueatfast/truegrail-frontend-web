import React, { Component } from 'react';
import { Router } from 'react-router-dom'; 
import RouterGuard from 'react-router-guard';
import history from '~/utils/history';
import headerConfig from '~/routes/header';
import routerConfig from '../routes/config';
import { UniversalNotice, UniversalModal }from '~/universal-components';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
