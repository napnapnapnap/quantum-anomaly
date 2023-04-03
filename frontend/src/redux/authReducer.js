import { login, logout } from '../auth';

export default function reducer(state = { user: null }, action) {
  switch (action.type) {
    case 'LOGIN': {
      if (action.payload.error) {
        return {
          ...state,
          loginError: action.payload.message,
        };
      } else {
        login(action.payload.token);
        return {
          ...state,
          ...action.payload,
        };
      }
    }

    case 'LOGIN_USER_INFO': {
      return {
        ...state,
        ...action.payload,
      };
    }

    case 'LOGOUT': {
      logout();
      return {};
    }

    default: {
      return { ...state };
    }
  }
}
