import {combineReducers} from 'redux';
import auth from './authReducer';
import efs from './efsReducer';
import epicArcs from './epicArcsReducer';
import eveNpcs from './eveNpcsReducer';
import x4 from './x4Reducer';

export default combineReducers({
  auth,
  efs,
  epicArcs,
  eveNpcs,
  x4
});
