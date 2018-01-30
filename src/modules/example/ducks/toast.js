// PREFIX
const PREFIX = 'EXAMPLE/POPUP';

// ACTIONS
const OPEN_TOAST = `${PREFIX}/OPEN_TOAST`;
const CLOSE_TOAST = `${PREFIX}/CLOSE_TOAST`;

// TOAST TIMER
// 由于非模态吐司不会阻塞操作，所以会有冲突问题
// 如果使用模态吐司，此处则可以简化去除timer的处理
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
};

// Reducer
const reducer = (state = { toast: {} }, action) => {
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
    default:
      return state;
  }
};

export default reducer;
export { actions };
