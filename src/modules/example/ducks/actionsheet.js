// PREFIX
const PREFIX = 'EXAMPLE/ACTIONSHEET';

// ACTIONS
const OPEN_SHEET = `${PREFIX}/OPEN_SHEET`;
const CLOSE_SHEET = `${PREFIX}/CLOSE_SHEET`;

// Action Creater
const actions = {
  openSheet: (name) => ({ type: OPEN_SHEET, payload: name }),
  closeSheet: (name) => ({ type: CLOSE_SHEET, payload: name }),
};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_SHEET:
      return {...state, [action.payload]: true };
    case CLOSE_SHEET:
      return {...state, [action.payload]: false };
    default:
      return state;
  }
};

export default reducer;
export { actions };
