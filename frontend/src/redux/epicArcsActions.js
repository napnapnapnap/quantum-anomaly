import axios from 'axios';

export function fetchEpicArcs() {
  return (dispatch) => {
    return axios.get('/api/epic-arcs/info')
      .then(response => dispatch({
        type: 'FETCH_EPIC_ARCS_INFO',
        payload: response.data
      }))
      .catch(err => console.log(err));
  };
}

export function fetchEpicArc(faction) {
  return (dispatch) => {
    return axios.get(`/api/epic-arcs/${faction}`)
      .then(response => dispatch({
        type: 'FETCH_EPIC_ARC',
        payload: response.data
      }))
      .catch(err => console.log(err));
  };
}
