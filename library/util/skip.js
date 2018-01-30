import Env from './env';
import JSBridge from './bridge';

// skip model
export default function skip(model) {
  // 非空检查
  if (!model) return null;

  // 转换JSON
  if (typeof model === 'string') {
    try {
      model = JSON.parse(model);
    } catch (e) {
      return null;
    }
  }

  // 重要: APP区别对待
  if (Env.is('app')) {
    return function() {
      JSBridge.skmodel({ skip: model });
    };
  }

  // 网页版本
  var data = model.entity || model;
  switch (Number(data.skno)) {
    case 1000:
      return '/home';
    case 1002:
      return '/assistant/notices';
    case 2000:
      return '/assistant';
    case 2100:
      return '/matter';
    case 2101:
      return '/matter/report';
    case 2102:
      return '/matter/report/package';
    case 2103:
      return '/matter/report/light';
    case 2104:
      return '/matter/report/hose';
    case 2105:
      return '/matter/report/picture';
    case 2106:
      return '/matter/report/line';
    case 2107:
      return '/matter/report/dredge';
    case 2108:
      return '/matter/report/boiler';
    case 2109:
      return '/matter/report/erepair';
    case 2110:
      return '/matter/report/eclean';
    case 2300: // 物业账单
      return '/property';
    case 4000:
      return '/profile';
    case 4001:
      return '/account/orders';
    case 4002:
      return '/account/addresses';
    case 4003:
      return '/shopping/cart';
    case 4008:
      return '/shopping/order/' + data.id;
    case 4009:
      return '/shopping/evaluate/' + data.id;
    case 4100:
      return '/wallet';
    case 4101:
      return '/wallet/records';
    case 4102:
      return '/wallet/deposit';
    case 4104:
      return '/account/coupons';
    case 4105:
      return '/wallet/manage';
    case 4107:
      return '/account/coupons';
    case 4200:
      return '/account/settings';
    case 4201:
      return '/house';
    case 4204:
      return '/account/mobile';
    case 5000:
      return '/shopping/groups/' + data.ids;
    case 5001:
    case 5002:
    case 5003:
      return '/shopping/channel';
    case 5004:
      return '/shopping/details/' + data.id;
    case 5005:
      return '/shopping/feature/' + data.id;
    case 5006:
      return '/shopping';
    case 7000:
      return data.url || '/home';
  }
  return null;
}
