// 初始化代码
function getInstance() {
  return new Promise(function(resolve) {
    // 尚未初始化
    if (typeof window._MEIQIA === 'undefined') {
      (function(m, ei, q, i, a, j, s) {
        m[i] = m[i] || function() {
          (m[i].a = m[i].a || []).push(arguments);
        };
        j = ei.createElement(q),
          s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = '//static.meiqia.com/dist/meiqia.js';
        s.parentNode.insertBefore(j, s);
      })(window, document, 'script', '_MEIQIA');
      window._MEIQIA('entId', 13712);
      window._MEIQIA('withoutBtn');
      window._MEIQIA('allSet', function() {
        resolve(window._MEIQIA);
      });
    }
    // 已经初始化
    else {
      resolve(window._MEIQIA);
    }
  });
}

function meiqia(business, name, skuId) {
  return getInstance().then(function(_MEIQIA) {
    let mb = CF.member || {};
    let pj = CF.project || {};
    _MEIQIA('metadata', {
      'name': mb.memberName || '*',
      'gender': mb.memberGender || '*',
      'tel': mb.memberMobile || '*',
      'avatar': mb.memberAvatar || '*',
      '城市': pj.cityName || '*',
      '社区': pj.name || '*',
      '业态': business || '',
      '商品': name || '',
      '主键': skuId || '',
    });
    if (mb && mb.memberId) {
      _MEIQIA('clientId', mb.memberId);
    }
    _MEIQIA('showPanel');

    return Promise.resolve(_MEIQIA);
  });
}

export default meiqia;
