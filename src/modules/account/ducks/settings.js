// PREFIX: MODULE/VIEW
const PREFIX = 'ACCOUNT/SETTINGS';

// WIDGETS ACTIONS
const OPEN_TOAST = `${PREFIX}/OPEN_TOAST`;
const CLOSE_TOAST = `${PREFIX}/CLOSE_TOAST`;
const OPEN_MODAL = `${PREFIX}/OPEN_MODAL`;
const CLOSE_MODAL = `${PREFIX}/CLOSE_MODAL`;

let timer = null;

// Action Creater
const actions = {

  openToast: (props, mills = 2000) => dispatch => {
    clearTimeout(timer);
    timer = setTimeout(() => dispatch(actions.closeToast()), mills);
    dispatch({ type: OPEN_TOAST, payload: props });
  },

  closeToast: () => {
    clearTimeout(timer);
    return { type: CLOSE_TOAST };
  },

  openModal: (props) => ({ type: OPEN_MODAL, payload: props }),

  closeModal: () => ({ type: CLOSE_MODAL }),

};

// Reducer
const reducer = (state = { modal: {}, toast: {} }, action) => {
  switch (action.type) {
    case OPEN_TOAST:
      return {
        ...state,
        toast: { modal: false, ...action.payload, show: true },
      };
    case CLOSE_TOAST:
      return {
        ...state,
        toast: {...state.toast, show: false },
      };
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
  }
  return state;
};

export default reducer;
export { actions };
