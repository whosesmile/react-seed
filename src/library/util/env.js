let types = ['qd-app', 'micromessenger', 'ali'];
let agent = navigator.userAgent.toLowerCase();
let matches = agent.match(/qd-app-(.+?)-(ios|android)/i);

// 运行环境
const Env = {

  // APP版本
  // return version || null，也可以依赖此识别是否是APP内
  version: matches && matches[1],

  // 是否内嵌 暂时考虑 千丁APP、微信、服务窗
  nested: types.filter((name) => agent.indexOf(name) !== -1).length > 0,

  // 各种识别
  is: (type) => {
    switch (type.toLowerCase()) {
      case 'browser':
        return typeof window !== 'undefined';
      case 'node':
        return typeof global !== 'undefined';
      case 'wx':
        return agent.indexOf('micromessenger') !== -1;
      case 'ali':
        return agent.indexOf('ali') !== -1;
      case 'ios':
        return Boolean(matches && matches[2] === 'ios');
      case 'android':
        return Boolean(matches && matches[2] === 'android');
      case 'app':
        return Boolean(matches);
      default:
        return false;
    }
  },

  // 获取平台
  get platform() {
    if (this.is('ios')) {
      return 'ios';
    } else if (this.is('android')) {
      return 'android';
    } else {
      return 'wx';
    }
  },

  // Test via a getter in the options object to see if the passive property is accessed
  supportPassive: (() => {
    let support = false;
    try {
      let opts = Object.defineProperty({}, 'passive', {
        get: function() {
          support = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}

    return support;
  })(),

};

export default Env;
