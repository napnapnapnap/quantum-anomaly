import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as cookies from './helpers/cookies';

import Header from './componentsCommon/Header';
import Footer from './componentsCommon/Footer';
import Cookies from './componentsCommon/Cookies';

import Home from './components/pages/Home';
import UnderConstruction from './componentsCommon/UnderConstruction';
import NotFound from './componentsCommon/NotFound';

import EfsShips from './components/Efs/Ships/index';
import Skills from './components/Efs/Skills/index';
import OverviewEpicArcs from './components/EpicArcs/index';
import Incursions from './components/Incursions/index';

import WarframeStatus from './components/Warframe/index';

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
