export default function reducer(state = null, action) {
  switch (action.type) {
    case 'FETCH_EPIC_ARCS_INFO': {
      return {
        ...action.payload
      };
    }
    case 'FETCH_EPIC_ARC': {
      const faction = Object.keys(action.payload)[0];
      const result = {...state};
      result[faction].missions = action.payload[faction];
      return result;
    }
    default: {
      return {...state};
    }
  }
};
