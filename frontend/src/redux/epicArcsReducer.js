export default function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_EPIC_ARCS': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'FETCH_EPIC_ARC': {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return {...state};
    }
  }
};
