// PREFIX
const PREFIX = 'EXAMPLE/POPUP';

// ACTIONS
const OPEN_POPUP = `${PREFIX}/OPEN_POPUP`;
const CLOSE_POPUP = `${PREFIX}/CLOSE_POPUP`;

// Action Creater
const actions = {
  openPopup: (name) => ({ type: OPEN_POPUP, payload: name }),
  closePopup: (name) => ({ type: CLOSE_POPUP, payload: name }),
};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return {...state, [action.payload]: true };
    case CLOSE_POPUP:
      return {...state, [action.payload]: false };
    default:
      return state;
  }
};

export default reducer;
export { actions };
