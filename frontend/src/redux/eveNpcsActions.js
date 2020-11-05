import axios from 'axios';

export function fetchNpcs(indices) {
  return (dispatch) => {
    return axios.get(`/api/npcs/${indices}`)
      .then(response => dispatch({
        type: 'FETCH_NPCS',
        payload: response.data
      }))
      .catch(err => console.log(err));
  };
}
