import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as cookies from '../helpers/cookies';

import Header from './ux/Header';
import Footer from './ux/Footer';
import Cookies from './ux/Cookies';

import Home from './pages/Home';
import Old from './pages/Old';
import UnderConstruction from './pages/UnderConstruction';
import NotFound from './pages/NotFound';

import EfsShips from './efs/OverviewShips';
import Skills from './efs/Skills';
import OverviewEpicArcs from './epic-arcs/OverviewEpicArcs';

const App = () => (
  <div>
    <Header />
    <main className="page-content-main">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/efs-ships' component={EfsShips}/>
        <Route path='/efs-fitting-screen/:shipID' component={UnderConstruction}/>
        <Route path='/skills' component={Skills}/>
        <Route path='/epic-arcs/:faction' component={OverviewEpicArcs}/>
        <Route path='/epic-arcs/' component={OverviewEpicArcs}/>
        <Route path='/incursion-manager' component={Old}/>
        <Route path="*" component={NotFound}/>
      </Switch>
      {cookies.getCookie('cookiesAgree') !== 'true' ? <Cookies /> : ''}
    </main>
    <Footer />
  </div>
);

export default App;
