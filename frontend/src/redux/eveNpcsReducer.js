export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_NPCS': {
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
