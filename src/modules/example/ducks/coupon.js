// PREFIX
const PREFIX = 'EXAMPLE/COUPON';

// ACTIONS
const OPEN_COUPON = `${PREFIX}/OPEN_COUPON`;
const CLOSE_COUPON = `${PREFIX}/CLOSE_COUPON`;
const CHOOSE_COUPON = `${PREFIX}/CHOOSE_COUPON`;

// Action Creater
const actions = {
  openCoupon: (name) => ({ type: OPEN_COUPON, payload: name }),
  closeCoupon: (name) => ({ type: CLOSE_COUPON, payload: name }),
  chooseCoupon: (name, coupon, costs) => {
    return (dispatch) => {
      dispatch(actions.closeCoupon(name));
      dispatch({ type: CHOOSE_COUPON, payload: { coupon: coupon, costs: costs } });
    };
  },
};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_COUPON:
      return {...state, [action.payload]: true };
    case CLOSE_COUPON:
      return {...state, [action.payload]: false };
    case CHOOSE_COUPON:
      {
        let payload = action.payload;
        return {...state,
          coupon: payload.coupon,
          costs: payload.costs,
        };
      }
    default:
      return state;
  }
};

export default reducer;
export { actions };
