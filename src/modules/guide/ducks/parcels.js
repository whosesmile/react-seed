// PREFIX
const PREFIX = 'GUIDE/PARCELS';

// ACTIONS
const LOADING = `${PREFIX}/LOADING`;
const FETCHED = `${PREFIX}/FETCHED`;

// Action Creater
const actions = {
  fetchParcels: () => dispatch => {
    dispatch({ type: LOADING });
    axios.get('/guide/ajax/parcels').then(({ data }) => {
      dispatch({ type: FETCHED, payload: data.list });
    });
  },
};

// Reducer
const reducer = (state = { loading: false, list: [] }, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCHED:
      return {
        ...state,
        loading: false,
        list: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
export { actions };
