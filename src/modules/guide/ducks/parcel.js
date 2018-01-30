// PREFIX
const PREFIX = 'GUIDE/PARCEL';

// ACTIONS
const FETCHED = `${PREFIX}/FETCHED`;

// Action Creater
const actions = {
  fetchParcel: (id) => dispatch => {
    axios.get('/guide/ajax/parcel', {
      params: { packageNoticeId: id }
    }).then(({ data }) => {
      dispatch({ type: FETCHED, payload: data.packageNoticeDetail });
    });
  },
};

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHED:
      return {
        ...state,
        parcel: {...action.payload },
      };
  }
  return state;
};

export default reducer;
export { actions };
