/* eslint-disable */

import { go } from './history';
import Env from './env';
import payoff from './payoff';
import Emitter from './emitter';
import meiqia from './meiqia';
import { encodeQuery, decodeQuery } from './query';

// 各种行为定义
const ACTIONS = {
  // 跳转模型
  SKMODEL: 'jsSkipModel',
  // 分享
  SHARE: 'jsShare',
  // 收银台
  PAYMENT: 'jsShowQDPay',
  // 乐购频道
  CHANNEL: 'jsShowGoodsCategoryList',
  // 设置菜单
  MENUBAR: 'jsShowMenuList',
  // 扫描二维码
  SCANNER: 'jsShowScannerQRCode',
  // 上传图片
  UPLOAD: 'jsShowCamera',
  // 订单通知
  ODCHANGE: 'jsOrderStatusChange',
  // 关闭自身
  CLOSE: 'jsToolCloseWebPage',
  // 获取GPS
  LOCATION: 'jsGetCurrentLocation',
  // 发送短信
  SMS: 'jsShowSMS',
  // 截屏传图
  SNAPSHOT: 'jsSnapshot',
  // 拨打电话
  DIALNUMBER: 'jsToolDialNumber',
  // app评分
  GRADE: 'jsToolGotoAppStoreGrade',
  // 是否安装指定app
  INTALLAPP: 'jsIsIntallApp',
  // 隐藏导航栏
  HIDENAV: 'jsHideNavigationbar',
  // 打开APP私聊页面
  PRIVATECHAT: 'jsShowPrivateChat',
  // 启动在线客服 ---- App 3.0
  SERVICEONLINE: 'jsCustomerServiceOnline',
  // 订单删除 ---- App 3.0
  DELORDER: 'jsDelOrder',
  // 群聊界面
  SHOWGROUP: 'jsShowGroupChat',
  // 自定义统计事件
  STATISTICS: 'jsStatistics'
};

// 自定义事件
const EVENTS = {
  GPS: 'event:locationResult',
  PAYMENT: 'event:payment',
  SCANNER: 'event:scanner',
  SHARE: 'event:share',
  UPLOAD: 'event:upload',
  INSTALL: 'event:IsIntallApp'
};

// 连接方法
const connect = function(callback) {
  if (Env.is('app')) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback(window.WebViewJavascriptBridge);
      }, false);

      // 3.0.0 新增
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    }
  }
};

// 对外接口
const JSBridge = {

  // 核心
  invoke: function(action, entity) {
    connect(function(bridge) {
      bridge.callHandler('jsCallApp', { action: action, entity: entity || {} });
    });
  },

  // 跳转
  skmodel: function() {
    var args = arguments;
    if (typeof args[0] === 'object') {
      return this.invoke(ACTIONS.SKMODEL, args[0]);
    }
    var entity = { skip: { entity: Object.assign({ skno: args[0] }, args[1]) } };
    return this.invoke(ACTIONS.SKMODEL, entity);
  },

  // 菜单
  menus: function(data) {
    if (Object.prototype.toString.call(data) === '[object Array]') {
      data = { menuList: data };
    }
    if (Env.is('app')) {
      this.invoke(ACTIONS.MENUBAR, data);
    }
  },

  // 关闭
  close: function(mills = 0) {
    if (Env.is('app')) {
      this.invoke(ACTIONS.CLOSE, {
        // 客户端需要整型
        delayTime: mills / 1000
      });
    } else if (Env.is('wx')) {
      wx.closeWindow();
    }
  },

  // 后退
  back: function() {
    history.go(-1);
    if (Env.is('app')) {
      if (history.length === 1) {
        JSBridge.close();
      } else {
        setTimeout(function() {
          JSBridge.close();
        }, 300);
      }
    }
  },

  // 商城首页
  shopping: function() {
    if (Env.is('app')) {
      JSBridge.skmodel(5006);
    } else {
      go('/shopping/channel');
    }
  },

  // 商品详情
  goods: function(id) {
    // 千丁扫码
    if (Env.is('app')) {
      JSBridge.skmodel(5004, { id: id });
    }
    // 网页
    else {
      go('/shopping/details/' + id);
    }
  },

  // 商城分类
  channel: function(id) {
    if (Env.is('app')) {
      axios.get('/shopping/ajax/category', { cache: true }).then(({ data }) => {
        this.invoke(ACTIONS.CHANNEL, { categoryId: id, category: data.list });
      });
    } else {
      go('/shopping/channel/' + id);
    }
  },

  // 订单列表
  orders: function() {
    if (Env.is('app')) {
      JSBridge.skmodel(4001);
    } else {
      go('/account/orders');
    }
  },

  // 刷新订单
  clearOrders: function(orderCode) {
    if (Env.is('app')) {
      this.invoke(ACTIONS.ODCHANGE, { orderCode: orderCode });
    } else {
      // TODO
    }
  },

  // 上传
  upload: function(limit, callback) {
    if (typeof limit == 'function') {
      callback = limit;
      limit = 1;
    }
    if (Env.is('app')) {
      this.invoke(ACTIONS.UPLOAD, {
        imageNum: limit,
        imageType: 'urlImage'
      });

      JSBridge.off(EVENTS.UPLOAD);
      JSBridge.on(EVENTS.UPLOAD, function(data) {
        return callback && callback(data.entity.urlImageList);
      });
    }
  },

  // 扫码
  scanner: function(accept, callback) {
    if (typeof accept === 'function') {
      callback = accept;
      accept = true;
    }
    // 千丁扫码
    if (Env.is('app')) {
      this.invoke(ACTIONS.SCANNER, {
        isGetReturnData: accept || false // 是否回传结果 不回传则APP自动处理
      });

      // 接受回调, 扫码返回的结果
      if (accept) {
        JSBridge.off(EVENTS.SCANNER);
        JSBridge.on(EVENTS.SCANNER, function(data) {
          return callback && callback(data.entity.scannerTextKey);
        });
      }
    }
    // 微信扫码
    else if (Env.is('wx') && 'wx' in window) {
      wx.ready(function() {
        wx.scanQRCode({
          needResult: accept ? 1 : 0,
          // 接受回调, 扫码返回的结果
          success: function(res) {
            callback && callback(res.resultStr);
          }
        });
      });
    }
  },

  // 支付
  payment: function(code, price, business) {
    // 单参: object
    let args = arguments;
    if (args.length === 1 && typeof args[0] === 'object') {
      code = args[0].code;
      price = args[0].price;
      business = args[0].business;
    }

    // 反馈地址
    const feedback = function(status, data = {}) {
      const pathname = payoff(business, status);
      const search = encodeQuery({
        posurl: data.posURL,
        paytype: data.payType,
        code: code,
        price: price,
        business: business
      });
      go(pathname + search);
    };

    // 如果需要支付金额为0 直接返回成功页
    if (Number(price) === 0) {
      return feedback('success');
    }

    if (Env.is('app')) {
      // 调用收银台
      this.invoke(ACTIONS.PAYMENT, {
        orderId: code,
        shouldPay: price,
        payBusinessType: business
      });
      // 支付回调
      JSBridge.off(EVENTS.PAYMENT);
      JSBridge.on(EVENTS.PAYMENT, function(data) {
        JSBridge.clearOrders(code);
        feedback(data.code == 200 ? 'success' : 'failure');
      });
    } else {
      go('/cashier/payment?code=' + code + '&price=' + price + '&business=' + business);
    }
  },

  // GPS
  gps: function(data, callback) {
    if (Env.is('app')) {
      this.invoke(ACTIONS.LOCATION, data);
    }
    JSBridge.off(EVENTS.GPS);
    JSBridge.on(EVENTS.GPS, function(data) {
      return callback && callback(data);
    });
  },

  // meiqia
  meiqia: function(business, name, skuId) {
    if (Env.is('app')) {
      JSBridge.skmodel(4206);
    } else {
      meiqia(business, name, skuId);
    }
  },

  // 是否安装指定APP
  isIntall: function(appNameType, callback) {
    if (Env.is('app')) {
      this.invoke(ACTIONS.INTALLAPP, {
        appNameType: appNameType // 0 支付宝, 1 微信, 2 企鹅
      });
      JSBridge.off(EVENTS.INSTALL);
      JSBridge.on(EVENTS.INSTALL, function(bool) {
        return callback && callback(bool);
      });
    }
  }
};

// 注入事件功能
Emitter(JSBridge);

// 发短信
JSBridge.sms = function(body, subject, recipients) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.SMS, {
      body: body, // 内容
      subject: subject, // 标题
      recipients: recipients // 收件人 数组
    });
  }
};

// 截屏
JSBridge.shot = function(imageType) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.SNAPSHOT, {
      imageType: imageType //  base64Image, urlImage,  both
    });
  }
};

// 电话
JSBridge.dialNumber = function(num) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.DIALNUMBER, {
      kQDDialNum: num
    });
  }
};

// 评分
JSBridge.grade = function(data) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.GRADE, data);
  }
};

// 隐藏导航栏
JSBridge.hideNav = function(alpha) {
  // 1(“显示)，0（隐藏）
  if (Env.is('app')) {
    this.invoke(ACTIONS.HIDENAV, {
      alpha: alpha || 0
    });
  }
};

// 打开APP私聊页面
JSBridge.privateChat = function(targetId, targetName, content) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.PRIVATECHAT, {
      targetId: targetId, // 目标id
      targetName: targetName, //聊天页面标题（一般为对方昵称）
      content: content //主动发送的消息，如有值则主动发送 否则不主动发送消息
    });
  }
};

// 打开群聊页面
JSBridge.groupChat = function(targetId, targetName, content) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.SHOWGROUP, {
      targetId: targetId, // 目标id
      targetName: targetName, //聊天页面标题（一般为对方昵称）
      content: content //主动发送的消息，如有值则主动发送 否则不主动发送消息
    });
  }
};

// 在线客服
JSBridge.serviceOnline = function(params) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.SERVICEONLINE, {
      params: params
    });
  }
};

// 订单删除 ---- App 3.0
JSBridge.delOrder = function(orderCode) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.DELORDER, {
      orderCode: orderCode
    });
  }
};

// 自定义统计事件
JSBridge.statistics = function(source, eventId, paramsStr) {
  if (Env.is('app')) {
    this.invoke(ACTIONS.STATISTICS, {
      source: source,
      eventId: eventId,
      paramsStr: paramsStr
    });
  }
};

// 分享
JSBridge.share = function(options) {
  // { title desc imgUrl link }
  if (Env.is('app')) {
    options = {
      shareType: 'Panel',
      shareScene: ['wxSession', 'wxTimeline', 'SocialGroup', 'CopyLink'],
      shareContent: {
        type: 'Web',
        imageType: 'url',
        title: options.title,
        text: options.desc,
        image: options.imgUrl,
        skipUrl: options.link
      }
    };

    this.invoke(ACTIONS.SHARE, options);
  }
};

// 定制微信分享
JSBridge.wxshare = function(options) {
  if (Env.is('wx') && 'wx' in window) {
    wx.ready(function() {
      ['onMenuShareTimeline', 'onMenuShareAppMessage'].forEach(function(name) {
        // 管家分享依赖URL中的hkMid来实现奖励政策
        // 所以分享的时候需要补足当前URL中的hkMid
        // 如果不做补充参数操作二次分享会导致参数丢失
        var query = decodeQuery(location.search);
        if (query.hkMid && options.link.indexOf('hkMid=') === -1) {
          var symbol = options.link.indexOf('?') === -1 ? '?' : '&';
          options.link = options.link + symbol + 'hkMid=' + encodeURIComponent(query.hkMid);
        }
        wx[name](Object.assign(options, {
          success: function() {
            JSBridge.emit(EVENTS.SHARE, options);
          }
        }));
      });
    });
  }
};

// 配置分享
JSBridge.shareConfig = function(options) {
  // APP
  if (Env.is('app')) {
    this.menubar([{ name: '分享', content: EVENTS.SHARE }]);
    JSBridge.off(EVENTS.SHARE);
    JSBridge.on(EVENTS.SHARE, function() {
      return JSBridge.share(options);
    });
  }
  // 微信
  else {
    JSBridge.wxshare(options);
  }
};

// 初始化桥
connect(function(bridge) {
  // 不能省略
  if (Env.is('android')) {
    bridge.init(function() {});
  }

  // 可以添加客户端方法
  bridge.registerHandler('webviewCallback', function(data) {
    // 格式化数据
    data = typeof data === 'object' ? data : JSON.parse(data);
    // 点击菜单
    if (data.action === 'menuClick') {
      if (/^event:/.test(data.entity.content)) {
        JSBridge.emit(data.entity.content);
      } else {
        go(data.entity.content);
      }
    }
    // 扫码结果
    else if (data.action === 'scanResult') {
      JSBridge.emit(EVENTS.SCANNER, data);
    }
    // 支付回调
    else if (data.eventType === 'jsShowQDPay') {
      JSBridge.emit(EVENTS.PAYMENT, data);
    }
    // 分享结果
    else if (data.action === 'shareResult') {
      // 找到分享数据
      JSBridge.emit(EVENTS.SHARE, data);
    }
    // 上传图片
    else if (data.action === 'imageFromApp' || data.entity && (data.entity.urlImageList || data.entity.base64ImageList)) {
      JSBridge.emit(EVENTS.UPLOAD, data);
    }
    // 回传当前位置结果
    else if (data.action === 'locationResult' || data.entity) {
      JSBridge.emit(EVENTS.GPS, data.entity);
    }
    // 回传 某app是否安装 的结果(支付宝、微信、QQ)
    else if (data.action === 'jsIsIntallApp') {
      JSBridge.emit(EVENTS.INSTALL, data.isIntall);
    }
  });
});

// Alias
JSBridge.menubar = JSBridge.menus;
JSBridge.location = JSBridge.gps;
JSBridge.intallApp = JSBridge.isIntall;

if (Env.is('browser')) {
  window.JSBridge = JSBridge;
}

export default JSBridge;
