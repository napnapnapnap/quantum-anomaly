import { combineReducers, configureStore } from '@reduxjs/toolkit';

import eveEpicArcsReducer from './redux/eve/epic-arcs';
import eveNpcsReducer from './redux/eve/npcs';
import x4FittingReducer from './redux/x4/fitting';
import x4MapReducer from './redux/x4/map';
import x4ModificationsReducer from './redux/x4/modifications';
import X4TerraformReducer from './redux/x4/terraform';
import X4WaresReducer from './redux/x4/wares';

const rootReducer = combineReducers({
  eveEpicArcs: eveEpicArcsReducer,
  eveNpcs: eveNpcsReducer,
  x4Fitting: x4FittingReducer,
  x4Modifications: x4ModificationsReducer,
  x4Map: x4MapReducer,
  x4Terraform: X4TerraformReducer,
  x4Wares: X4WaresReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
