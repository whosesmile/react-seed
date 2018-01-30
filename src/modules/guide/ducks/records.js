// PREFIX
const PREFIX = 'GUIDE/RECORDS';

// ACTIONS
const LOADING = `${PREFIX}/LOADING`;
const FETCHED = `${PREFIX}/FETCHED`;
const TABINDEX = `${PREFIX}/TABINDEX`;

// Action Creater
const actions = {

  activeTab: (index) => ({ type: TABINDEX, payload: index }),

  fetchRecords: () => dispatch => {
    dispatch({ type: LOADING });
    axios.get('/guide/ajax/records').then(({ data }) => {
      dispatch({ type: FETCHED, payload: data.list });
    });
  },
};

// Reducer
const reducer = (state = { loading: false, tabIndex: 1, list: [] }, action) => {
  switch (action.type) {
    case TABINDEX:
      return {
        ...state,
        tabIndex: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCHED:
      return {
        ...state,
        loading: false,
        list: [...action.payload],
      };
  }
  return state;
};

export default reducer;
export { actions };
