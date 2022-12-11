import { combineReducers } from 'redux';

import auth from './authReducer';
import efs from './efsReducer';
import x4 from './x4Reducer';

export default combineReducers({
  auth,
  efs,
  x4,
});
