// PREFIX
const PREFIX = 'EXAMPLE/MODAL';

// ACTIONS
const OPEN_MODAL = `${PREFIX}/OPEN_MODAL`;
const CLOSE_MODAL = `${PREFIX}/CLOSE_MODAL`;

// Action Creater
const actions = {
  openModal: (props) => ({ type: OPEN_MODAL, payload: props }),
  closeModal: () => ({ type: CLOSE_MODAL }),
};

// Reducer
const reducer = (state = { modal: {} }, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: {...action.payload, show: true },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {...state.modal, show: false },
      };
    default:
      return state;
  }
};

export default reducer;
export { actions };
