// PREFIX: MODULE/VIEW
const PREFIX = 'ACCOUNT/ADDRESSES';

// WIDGETS ACTIONS
const OPEN_TOAST = `${PREFIX}/OPEN_TOAST`;
const CLOSE_TOAST = `${PREFIX}/CLOSE_TOAST`;

// LOADED ADDRESS
const LOADED_ADDRESS = `${PREFIX}/LOADED_ADDRESS`;

// DEFAULT ADDRESS
const SET_DEFAULT_SUCCESS = `${PREFIX}/SET_DEFAULT_SUCCESS`;

// DELETE ADDRESS
const DELETE_ADDRESS = `${PREFIX}/DELETE_ADDRESS`;

// TOAST TIMER
// 由于非模态吐司不会阻塞操作，所以会有冲突问题
// 如果使用模态吐司，此处则可以简化去除timer的处理
let timer = null;

// ACTION CREATER
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

  fetchAddress: () => dispatch => {
    axios.get('/account/ajax/addresses').then(({ data }) => {
      dispatch({ type: LOADED_ADDRESS, payload: data.list });
    });
  },

  setDefault: (address) => dispatch => {
    dispatch(actions.closeToast());
    axios.post('/account/ajax/default', {
      id: address.id,
    }).then(() => {
      dispatch({ type: SET_DEFAULT_SUCCESS, payload: address });
      dispatch(actions.openToast({
        icon: 'success',
        message: '设置成功',
      }));
    });
  },

  deleteAddress: (address) => dispatch => {
    dispatch(actions.closeToast());
    axios.delete('/account/ajax/address', {
      data: { id: address.id },
    }).then(() => {
      dispatch({ type: DELETE_ADDRESS, payload: address });
      dispatch(actions.openToast({
        icon: 'success',
        message: '删除成功',
      }));
    });
  },
};

// Reducer
const reducer = (state = { toast: {}, list: [], loading: true }, action) => {
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
    case LOADED_ADDRESS:
      return {
        ...state,
        loading: false,
        list: [...action.payload],
      };
    case SET_DEFAULT_SUCCESS:
      return {
        ...state,
        list: state.list.map(item => {
          item.defaultFlag = action.payload.id == item.id;
          return item;
        }),
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
export { actions };
