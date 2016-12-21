import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './header-footer/Header';
import Footer from './header-footer/Footer';

import Home from './pages/Home';
import Old from './pages/Old';

import OverviewShips from './fitting-manager/OverviewShips';
import Skills from './fitting-manager/Skills';
import OverviewEpicArcs from './epic-arcs/OverviewEpicArcs';

import NotFound from './NotFound';

const App = () => (
  <div>
    <Header />
    <main className="page-content-main">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/ships' component={OverviewShips}/>
        <Route path='/skills' component={Skills}/>
        <Route path='/epic-arcs/:faction' component={OverviewEpicArcs}/>
        <Route path='/epic-arcs/' component={OverviewEpicArcs}/>
        <Route path='/incursion-manager' component={Old}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App
