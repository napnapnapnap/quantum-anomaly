import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as cookies from '../helpers/cookies';

import Header from './common/Header';
import Footer from './common/Footer';
import Cookies from './common/Cookies';

import Home from './pages/Home';
import UnderConstruction from './common/UnderConstruction';
import NotFound from './common/NotFound';

import EfsShips from './Efs/Ships';
import Skills from './Efs/Skills';
import OverviewEpicArcs from './EpicArcs';
import Incursions from './Incursions';

import WarframeStatus from './Warframe';

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
        <Route path='/incursion-manager' component={Incursions}/>
        <Route path='/warframe-status' component={WarframeStatus}/>
        <Route path="*" component={NotFound}/>
      </Switch>
      {cookies.getCookie('cookiesAgree') !== 'true' ? <Cookies /> : ''}
    </main>
    <Footer />
  </div>
);

export default App;
