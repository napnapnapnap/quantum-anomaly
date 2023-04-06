import axios from 'axios';

export function fetchShipGroups() {
  return (dispatch) => {
    return axios
      .post('/api/eve-fitting-simulator/groups')
      .then((response) =>
        dispatch({
          type: 'FETCH_SHIP_GROUPS',
          payload: response.data,
        })
      )
      .catch((err) => console.log(err));
  };
}

export function fetchShipGroup(id) {
  return (dispatch) => {
    return axios
      .post('/api/eve-fitting-simulator/group', { id: id })
      .then((response) =>
        dispatch({
          type: 'FETCH_CURRENT_SHIP_GROUP',
          payload: response.data,
        })
      )
      .catch((err) => console.log(err));
  };
}

export function fetchShip(id) {
  return (dispatch) => {
    return axios
      .post('/api/eve-fitting-simulator/ship', { id: id })
      .then((response) => dispatch({ type: 'FETCH_SHIP', payload: response.data }))
      .catch((err) => console.log(err));
  };
}

export function fetchModuleGroups(id) {
  return (dispatch) => {
    return axios
      .post('/api/eve-fitting-simulator/module-groups', { id: id })
      .then((response) => dispatch({ type: 'FETCH_MODULE_GROUPS', payload: response.data }))
      .catch((err) => console.log(err));
  };
}

export function fetchModuleGroup(id) {
  return (dispatch) => {
    return axios
      .post('/api/eve-fitting-simulator/module-group', { id: id })
      .then((response) => dispatch({ type: 'FETCH_MODULE_GROUP', payload: response.data }))
      .catch((err) => console.log(err));
  };
}

export function fetchDogma(id) {
  return (dispatch) => {
    return axios
      .post('/api/eve-fitting-simulator/dogma')
      .then((response) => dispatch({ type: 'FETCH_DOGMA', payload: response.data }))
      .catch((err) => console.log(err));
  };
}
