import {combineReducers} from 'redux';
import efsReducer from './efsReducer';
import epicArcsReducer from './epicArcsReducer';

export default combineReducers({
  efsReducer,
  epicArcsReducer
});
