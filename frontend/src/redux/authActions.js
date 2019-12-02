import axios from 'axios';
import {isLoggedIn} from '../auth';

export function loginUser(email, password) {
  return (dispatch) => axios.post('/user/login', {email, password})
    .then(response => dispatch({type: 'LOGIN', payload: response.data}))
    .catch(err => console.log(err));
}

export function getUserInfo() {
  return (dispatch) => {
    if (isLoggedIn()) return axios.get('/user/info')
      .then(response => dispatch({type: 'LOGIN_USER_INFO', payload: response.data}))
      .catch(err => console.log(err));
  };
}

export function logout() {
  return (dispatch) => dispatch({type: 'LOGOUT'});
}
