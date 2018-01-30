// PREFIX
const PREFIX = 'EXAMPLE/LOADER';

// ACTIONS
const FETCH_SUCCESS = `${PREFIX}/FETCH_SUCCESS`;

// Action Creater
const actions = {
  received: (list) => ({ type: FETCH_SUCCESS, payload: list }),
};

// Reducer
const reducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {...state, list: action.payload };
    default:
      return state;
  }
};

export default reducer;
export { actions };
