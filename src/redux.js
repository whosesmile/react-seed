import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducers } from './schema';
import { Env, isFSA } from 'library/util';

// PREFIX
const PREFIX = 'APP';

// 路由更改
const ROUTER_CHANGED = `${PREFIX}/ROUTER_CHANGED`;

// WIDGETS ACTIONS
const OPEN_TOAST = `${PREFIX}/OPEN_TOAST`;
const CLOSE_TOAST = `${PREFIX}/CLOSE_TOAST`;
const OPEN_MODAL = `${PREFIX}/OPEN_MODAL`;
const CLOSE_MODAL = `${PREFIX}/CLOSE_MODAL`;

const CLEAN_STATE = `${PREFIX}/CLEAN_STATE`;
const CHANGE_ADDRESS = `${PREFIX}/CHANGE_ADDRESS`;
const UPDATE_MEMBER = `${PREFIX}/UPDATE_MEMBER`;

let timer = null;

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

// 收货地址
const setAddress = (address) => ({
  type: CHANGE_ADDRESS,
  payload: address,
});

// 默认地址
const getAddress = () => dispatch => {
  return axios.get('/account/ajax/address', { global: false }).then(({ data }) => {
    if (data.id) {
      dispatch({
        type: CHANGE_ADDRESS,
        payload: data,
      });
    }
  });
};

// 销毁数据
const destroy = (module, view) => {
  // 危险操作做警告
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-console */
    console.log(`%c危险操作: %c${module}/${view}状态被重置`, 'color: #e64340', 'color: #0ae');
  }
  return { type: CLEAN_STATE, payload: { module, view } };
};

// 更新用户
const updateMember = (props) => dispatch => {
  axios.put('/account/ajax/update', props).then(() => {
    dispatch({ type: UPDATE_MEMBER, payload: props });
  });
};

// 背景色替换 仅作演示使用 示范全局Reducer应用 并无实际意义
const background = (state = 'rgb(230,230,230)', action) => {
  switch (action.type) {
    case ROUTER_CHANGED:
      {
        // 开发范例
        if (process.env.NODE_ENV !== 'production') {
          // 首页key为空
          let k = action.payload || 'xxxxxx';
          let f = (x, y) => (k.charCodeAt(x) + k.charCodeAt(y)) % 256;
          return `rgb(${f(0,1)}, ${f(2,3)}, ${f(4,5)})`;
        }

        // 重置微信分享
        if (Env.is('wx') && 'wx' in window) {
          wx.ready(function() {
            // 重置默认分享内容
            ['onMenuShareTimeline', 'onMenuShareAppMessage'].forEach(function(name) {
              wx[name]({
                title: '关注千丁',
                desc: '点亮社区的精灵',
                imgUrl: 'https://img1.qdingnet.com/8abf683f45ca1b94939c296174f92aa7.png',
                link: `https://${location.host}/wxfollow`,
              });
            });
          });
        }

        return 'rgb(230,230,230)';
      }
    default:
      return state;
  }
};

// 全局异步请求指示器
const widgets = (state = { modal: {}, toast: {} }, action) => {
  switch (action.type) {
    case OPEN_TOAST:
      return {
        ...state,
        toast: {
          modal: false,
          ...action.payload,
          show: true
        },
      };
    case CLOSE_TOAST:
      return {
        ...state,
        toast: {...state.toast, show: false },
      };
    case OPEN_MODAL:
      return {
        ...state,
        toast: {...state.toast, show: false },
        modal: {...action.payload, show: true },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        toast: {...state.toast, show: false },
        modal: {...state.modal, show: false },
      };
  }
  return state;
};

// 收货地址
const address = (state = null, action) => {
  switch (action.type) {
    case CHANGE_ADDRESS:
      return {...action.payload };
    default:
      return state;
  }
};

// 用户
const member = (state = null, action) => {
  switch (action.type) {
    case UPDATE_MEMBER:
      return {...state, ...action.payload };
    default:
      return state;
  }
};

// 社区
const project = (state = null) => state;

// reducer
const reducer = combineReducers({
  member,
  project,
  widgets,
  address,
  background,
  modules: combineReducers(reducers),
});

// middleware
let middleware = [thunk];

// logger but not in production
if (process.env.NODE_ENV !== 'production') {
  require('core-js/modules/es6.object.assign');
  let createLogger = require('redux-logger').createLogger;
  let logger = createLogger({ collapsed: true });
  middleware = [...middleware, logger];
}

// create store
const store = createStore((state, action) => {
  // 检查FSA规范
  if (process.env.NODE_ENV !== 'production') {
    if (!isFSA(action)) {
      /* eslint-disable no-console */
      console.error('Against FSA(flux standard action):' + action.type);
    }
  }

  // 加入模块清空逻辑
  if (action.type === CLEAN_STATE) {
    delete state.modules[action.payload.module][action.payload.view];
  }
  return reducer(state, action);
}, { member: CF.member, project: CF.project }, applyMiddleware(...middleware));

export {
  ROUTER_CHANGED,
  actions,
  destroy,
  setAddress,
  getAddress,
  updateMember,
};
export default store;
