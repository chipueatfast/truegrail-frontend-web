import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import RouterGuard from 'react-router-guard';
import history from './utils/history';
import routerConfig from './routes/config';
import UniversalNotice from './UniversalNotice';
import UniversalModal from './UniversalModal';

import vansLogo from './img/vans_logo.jpg';
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
          <BrowserRouter history={history}>
            <RouterGuard config={routerConfig}/>
          </BrowserRouter>
          <UniversalNotice />
          <UniversalModal />
        </div>
      // </DrizzleProvider>
    );
  }
}

export default App;
