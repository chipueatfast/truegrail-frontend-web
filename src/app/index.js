import React from 'react';
import styled from 'styled-components';
import { Router } from 'react-router-dom'; 
import RouterGuard from 'react-router-guard';
import history from '~/utils/history';
import headerConfig from '~/routes/header';
import routerConfig from '../routes/config';
import { UniversalNotice, UniversalModal }from '~/universal-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

function App() {
  return (
    <Container>
      <Router history={history}>
        <RouterGuard config={headerConfig} />
      </Router>
      <Router history={history}>
        <RouterGuard config={routerConfig}/>
      </Router>
      <UniversalNotice />
      <UniversalModal />
    </Container>
  );
}

export default App;
