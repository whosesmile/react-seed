// PREFIX
const PREFIX = 'EXAMPLE/DISTRICT';

// ACTIONS
const OPEN_DISTICT = `${PREFIX}/OPEN_DISTICT`;
const CLOSE_DISTICT = `${PREFIX}/CLOSE_DISTICT`;
const CHOOSE_DISTICT = `${PREFIX}/CHOOSE_DISTICT`;

// Action Creater
const actions = {
  openDistrict: (name) => ({ type: OPEN_DISTICT, payload: name }),
  closeDistrict: (name) => ({ type: CLOSE_DISTICT, payload: name }),
  chooseDistrict: (name, data, selected) => {
    return (dispatch) => {
      dispatch(actions.closeDistrict(name));
      dispatch({ type: CHOOSE_DISTICT, payload: { name: name, data: data, selected: selected } });
    };
  }
};

// Reducer
const reducer = (state = {
  // 没有选中的范例
  A: {},
  // 默认选中的范例 (数据结构看自己的业务,此处仅为演示)
  B: {
    pvid: 3,
    ctid: 35,
    arid: 58,
    pvname: '河北省',
    ctname: '唐山市',
    arname: '开平区',
  }
}, action) => {
  switch (action.type) {
    case OPEN_DISTICT:
      return {...state, [action.payload]: true };
    case CLOSE_DISTICT:
      return {...state, [action.payload]: false };
    case CHOOSE_DISTICT:
      {
        let payload = action.payload;
        return {...state,
          // showA->A  showB->B ...
          [payload.name.substring(4)]: {
            pvid: payload.data[0].id,
            ctid: payload.data[1].id,
            arid: payload.data[2].id,
            pvname: payload.data[0].label,
            ctname: payload.data[1].label,
            arname: payload.data[2].label,
          },
          selected: payload.selected,
        };
      }
    default:
      return state;
  }
};

export default reducer;
export { actions };
