import axios from 'axios';
import {setCookie, deleteAllCookies, getCookie} from './helpers/cookies';

const JWT_COOKIE = 'JWT',
  JWT_COOKIE_BAKE_TIME = 24 * 60 * 60;

export function login(token) {
  setCookie(JWT_COOKIE, token, JWT_COOKIE_BAKE_TIME);
  setRequestHeaders(token);
}

export function isLoggedIn() {
  const isLoggedIn = !!getCookie(JWT_COOKIE);
  if (isLoggedIn) setRequestHeaders(true);
  return isLoggedIn;
}

export function logout() {
  setRequestHeaders(null);
  deleteAllCookies();
  window.location.replace('/');
}

export function setRequestHeaders(token) {
  if (token === null) {
    delete axios.defaults.headers.common.Authorization;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${getCookie(JWT_COOKIE)}`;
  }
}
