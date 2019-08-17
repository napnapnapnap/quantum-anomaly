const defaultState = {
  data:            {
    info:     {
      amarr:    {},
      caldari:  {},
      gallente: {},
      minmatar: {}
    },
    missions: {
      amarr:    [],
      caldari:  [],
      gallente: [],
      minmatar: []
    }
  },
  fetchedInfo:     false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_EPIC_ARCS_INFO': {
      return {
        ...state,
        data:        {
          ...state.data,
          info: action.payload
        },
        fetchedInfo: true
      };
    }
    case 'FETCH_EPIC_ARC': {
      return {
        ...state,
        data:        {
          ...state.data,
          missions: {
            ...state.data.missions,
            ...action.payload
          }
        },
      };
    }
    default: {
      return {...state};
    }
  }
};
