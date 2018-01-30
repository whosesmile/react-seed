// PREFIX: MODULE/VIEW
const PREFIX = 'ACCOUNT/HOME';

// BUSINESS ACTIONS
const FETCH_ORDERS = `${PREFIX}/FETCH_ORDERS`;

// ACTION CREATER
const actions = {

  fetchOrders: (list) => ({ type: FETCH_ORDERS, payload: list }),

};

// Reducer
const reducer = (state = { orders: [], }, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
export { actions };
