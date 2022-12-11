import axios from 'axios';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import * as auth from './auth';
import Home from './components/Home';
import NotFound from './components/NotFound';
import StyleGuide from './components/StyleGuide';
import EpicArc from './containers/epic-arcs/Detail';
import EpicArcsOverview from './containers/epic-arcs/Overview';
import X4Map from './containers/x4/Map';
import X4Modifications from './containers/x4/Modifications';
import X4ResourcesTable from './containers/x4/Resources';
import X4ShipEfficiency from './containers/x4/ShipEfficiency';
import X4Ships from './containers/x4/Ships';
import { hashUserId, updateCanonical } from './helpers';
import { deleteCookie } from './helpers/cookies';

function App() {
  useEffect(() => {
    // if (auth.isLoggedIn()) this.props.getUserInfo();
    updateCanonical();
    //this.props.history.listen(updateCanonical);
    window.location.href.indexOf('darkMode=false') !== -1 && deleteCookie('dark-mode');

    axios
      .get('/api/user')
      .then((response) => {
        // @ts-ignore
        window.ga('create', 'UA-216496717-1', { storage: 'none', clientId: hashUserId(response.data) });
        // @ts-ignore
        window.ga('set', 'anonymizeIp', true);
        // @ts-ignore
        window.ga('send', 'pageview');
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/epic-arcs/:faction/:mission" element={<EpicArc />} />
        <Route path="/epic-arcs/:faction" element={<EpicArc />} />
        <Route path="/epic-arcs" element={<EpicArcsOverview />} />
        <Route path="/x4/efficiency/" element={<X4ShipEfficiency />} />
        <Route path="/x4/ships" element={<X4Ships />} />
        <Route path="/x4/map" element={<X4Map />} />
        <Route path="/x4/resources" element={<X4ResourcesTable />} />
        <Route path="/x4/modifications" element={<X4Modifications />} />
        {/*<Route exact path="/x4/terraform" render={props => <X4Terraform {...props} />} />*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
