import {combineReducers} from 'redux';
import efs from './efsReducer';
import epicArcs from './epicArcsReducer';
import eveNpcs from './eveNpcsReducer';

export default combineReducers({
  efs,
  epicArcs,
  eveNpcs
});
