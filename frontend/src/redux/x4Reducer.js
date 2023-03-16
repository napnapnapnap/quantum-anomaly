export default function reducer(state = null, action) {
  switch (action.type) {
    case 'FETCH_X4_SHIPS': {
      return {
        ...state,
        ships: {...action.payload}
      };
    }
    case 'FETCH_X4_EQUIPMENT': {
      return {
        ...state,
        equipment: {...action.payload}
      };
    }
    case 'FETCH_X4_MAP': {
      return {
        ...state,
        map: {...action.payload}
      };
    }
    case 'FETCH_X4_MODIFICATIONS': {
      return {
        ...state,
        modifications: {...action.payload}
      };
    }
    case 'FETCH_X4_TERRAFORM': {
      return {
        ...state,
        terraform: {...action.payload}
      };
    }
    default: {
      return {...state};
    }
  }
};
