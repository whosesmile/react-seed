// PREFIX: MODULE/VIEW
const PREFIX = 'ACCOUNT/HOME';

// BUSINESS ACTIONS
const FETCH_WALLET = `${PREFIX}/FETCH_WALLET`;
const FETCH_PROPERTY = `${PREFIX}/FETCH_PROPERTY`;

// ACTION CREATER
const actions = {

  fetchWallet: () => dispatch => {
    axios.get('/wallet/ajax/summary').then(({ data }) => {
      dispatch({ type: FETCH_WALLET, payload: data.entity });
    });
  },

  fetchProperty: () => dispatch => {
    axios.get('/assistant/ajax/property').then(({ data }) => {
      dispatch({ type: FETCH_PROPERTY, payload: data.list });
    });
  },

};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_WALLET:
      return {
        ...state,
        wallet: {...action.payload },
      };
    case FETCH_PROPERTY:
      return {
        ...state,
        property: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
export { actions };
