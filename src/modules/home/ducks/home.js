// PREFIX
const PREFIX = 'HOME/HOME';

// ACTIONS
const RECEIVED = `${PREFIX}/RECEIVED`;

// Action Creater
const actions = {

  // async action
  services: () => dispatch => {
    axios.get('/assistant/ajax/services').then(({ data }) => {
      dispatch({ type: RECEIVED, payload: data.projectServiceList });
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
