// 解码
export const decodeQuery = search => {
  if (!search) {
    return {};
  }

  return (/^[?#]/.test(search) ? search.slice(1) : search).split('&').reduce((params, tuple) => {
    let [key, value] = tuple.split('=');
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
    return params;
  }, {});
};

// 编码
export const encodeQuery = query => {
  if (!query) {
    return '';
  }

  let keys = Object.keys(query);
  if (keys.length === 0) {
    return '';
  }
  return '?' + keys.map(key => {
    return key + '=' + (query[key] ? encodeURIComponent(query[key]) : '');
  }).join('&');
};
