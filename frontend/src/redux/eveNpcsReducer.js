export default function reducer(state = null, action) {
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
