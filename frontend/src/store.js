import {applyMiddleware, createStore} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './redux/reducers';

export default process.env.NODE_ENV === 'development' ? createStore(reducer, applyMiddleware(thunk, createLogger()))
                                                      : createStore(reducer, applyMiddleware(thunk));
