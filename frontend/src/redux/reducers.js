import {combineReducers} from 'redux';
import efsReducer from './efsReducer';
import epicArcs from './epicArcsReducer';
import eveNpcs from './eveNpcsReducer';

export default combineReducers({
  efsReducer,
  epicArcs,
  eveNpcs
});
