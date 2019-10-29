import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
// import UnderConstruction from './components/UnderConstruction';
import NotFound from './components/NotFound';

import Home from './components/Home';
import Admin from './components/Admin';
import ShipSelector from './containers/eve-fitting-tool/Selection-Screen';
import ShipView from './containers/eve-fitting-tool/Fitting-Screen';

import EpicArcs from './containers/epic-arcs';
import EpicArcsGeneral from './containers/epic-arcs/General';

import Skills from './containers/legacy/Efs/Skills/';
import Incursions from './containers/legacy/Incursions/';
import Warframe from './containers/legacy/Warframe/';

function updateCanonical () {
  const link = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', window.location.protocol + '//' + window.location.host + window.location.pathname);
  document.head.appendChild(link);
}

const App = ({history}) => {
  updateCanonical();
  history.listen(() => updateCanonical());

  return (
    <React.Fragment>
      <header className="page-content-header">
        <Navigation />
      </header>
      <main className="page-content-main">
        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/admin' component={Admin} />

          <Route exact path='/eve-fitting-simulator' component={ShipSelector} />
          <Route exact path='/eve-fitting-simulator/:shipId' component={ShipView} />
          <Route path='/skills' component={Skills} />

          <Route exact path='/epic-arcs/:faction(amarr|caldari|gallente|minmatar)/:mission' component={EpicArcs} />
          <Route exact path='/epic-arcs/:faction(amarr|caldari|gallente|minmatar)' component={EpicArcs} />
          <Route exact path='/epic-arcs/general' component={EpicArcsGeneral} />
          <Route exact path='/epic-arcs' component={EpicArcs} />

          <Route path='/incursion-manager' component={Incursions} />

          <Route path='/warframe' component={Warframe} />

          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <footer className="page-content-footer">
        <Footer />
      </footer>
    </React.Fragment>
  )
};

export default withRouter(App);
