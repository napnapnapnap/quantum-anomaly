import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';

import App from './App';
import store from './store';
import {isLoggedIn} from './auth';

import './main.scss';

isLoggedIn();

render((
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
