// PREFIX
const PREFIX = 'HOME/SETTINGS';

// ACTIONS
const RECEIVED = `${PREFIX}/RECEIVED`;

const actions = {

  // Async action
  fetchList: () => dispatch => {
    axios.get('/home/ajax/list').then(({ data }) => {
      dispatch({ type: RECEIVED, payload: data.list });
    }).catch(e => e);
  },

};

// Reducer
const reducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case RECEIVED:
      return {...state, list: [...action.payload] };
    default:
      return state;
  }
};

export default reducer;
export { actions };
