import { encodeQuery } from './query';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const rules = /^https?:\/\/([^/]+)?([^?]+)(\?.+)*/;

// 兼容 React-Router3 query
const compatible = to => {
  // 如果已经存在search, 则认为使用了新API
  if (typeof to !== 'object' || to.search) {
    return to;
  }
  let { query, ...others } = to;
  return {...others, search: encodeQuery(query) };
};

// 将 Link.to 转换为 string
const flatten = to => {
  if (typeof to !== 'object') {
    return to;
  }
  // 兼容 query
  to = compatible(to);
  let { pathname, search = '', hash = '' } = to;
  return pathname + search + hash;
};

// 动态路由跳转
const go = (to, replace) => {
  let link = flatten(to);
  const matches = link.match(rules);
  if (matches) {
    if (matches[1] !== location.host) {
      return replace ? location.replace(link) : location.assign(link);
    } else {
      link = matches[2] + (matches[3] || '');
    }
  }
  return replace ? history.replace(link) : history.push(link);
};

export default history;
export { go, flatten };
