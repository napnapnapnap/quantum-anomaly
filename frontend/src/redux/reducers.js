import { combineReducers } from 'redux';

import auth from './authReducer';
import efs from './efsReducer';

export default combineReducers({
  auth,
  efs,
});
