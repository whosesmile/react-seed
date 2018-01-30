// PREFIX
const PREFIX = 'EXAMPLE/PICKER';

// ACTIONS
const OPEN_PICKER = `${PREFIX}/OPEN_PICKER`;
const CLOSE_PICKER = `${PREFIX}/CLOSE_PICKER`;

// Action Creater
const actions = {
  openPicker: (name) => ({ type: OPEN_PICKER, payload: name }),
  closePicker: (name, choose, selected) => {
    if (choose && selected) {
      /* eslint-disable no-console */
      console.log('你选择了:', JSON.stringify(choose), JSON.stringify(selected));
    }
    return { type: CLOSE_PICKER, payload: name };
  },
};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_PICKER:
      return {...state, [action.payload]: true };
    case CLOSE_PICKER:
      return {...state, [action.payload]: false };
    default:
      return state;
  }
};

export default reducer;
export { actions };
