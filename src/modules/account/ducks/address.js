// PREFIX: MODULE/VIEW
const PREFIX = 'ACCOUNT/ADDRESS';

// WIDGETS ACTIONS
const OPEN_TOAST = `${PREFIX}/OPEN_TOAST`;
const CLOSE_TOAST = `${PREFIX}/CLOSE_TOAST`;

// LOADED ADDRESS
const LOADED_ADDRESS = `${PREFIX}/LOADED_ADDRESS`;

// UPDATE ADDRESS
const UPDATE_ADDRESS = `${PREFIX}/UPDATE_ADDRESS`;

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

  fetchAddress: (id) => (dispatch, getState) => {
    // 编辑
    if (id) {
      return axios.get('/account/ajax/address', {
        params: { id: id },
      }).then(({ data }) => {

        // 没有社区
        if (!data.projectId) {
          data.projectId = 0;
          data.projectName = '其他社区';
        }
        // 有社区但没房屋
        else if (!data.roomId) {
          data.roomId = 0;
          data.roomName = '其他房屋';
        }

        // 是否有组团 (兼容脏数据)
        if (data.projectId) {
          axios.get('/location/ajax/project', {
            params: { id: data.projectId },
            cache: true,
          }).then(project => {
            data.hasGroup = project.data.groups.length > 0;
            dispatch({ type: LOADED_ADDRESS, payload: data });
          });
        } else {
          data.hasGroup = Boolean(data.groupId);
          dispatch({ type: LOADED_ADDRESS, payload: data });
        }
      });
    }

    // 新增
    const { member, project } = getState();
    const address = {
      name: member.memberName,
      mobile: member.memberMobile,
      provinceId: project.provinceId,
      provinceName: project.provinceName,
      cityId: project.cityId,
      cityName: project.cityName,
      areaId: project.districtId,
      areaName: project.districtName,
      projectId: project.id,
      projectName: project.name,
      street: project.streetInfo,

      // UI逻辑
      hasGroup: project.groups.length > 0,
    };
    dispatch({ type: LOADED_ADDRESS, payload: address });
  },

  updateAddress: (address) => ({ type: UPDATE_ADDRESS, payload: address }),

};

// Reducer
const reducer = (state = { toast: {}, address: {} }, action) => {
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
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: {...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
export { actions };
