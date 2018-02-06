// 根据业态返回不同的路由
const ROUTES = {
  JF: { success: '/integral/success', failure: '/integral/failure' },
  WF: { success: '/property/success', failure: '/property/failure' },
  CS: { success: '/csbusiness/paysuccess', failure: '/csbusiness/payfailure' },
  TS: { success: '/travel/success', failure: '/travel/failure' },
  TL: { success: '/tourism/success', failure: '/tourism/failure' },
  NC: { success: '/cleaning/success', failure: '/cleaning/failure' },
  AY: { success: '/baomu/paysuccess', failure: '/baomu/payfailure' },
  PS: { success: '/pyrepair/rpzfsuccess', failure: '/pyrepair/rppayfailure' },
  VM: { success: '/visual/paysuccess', failure: '/visual/payfailure' }, //虚拟券
  MS: { success: '/market/paysuccess', failure: '/market/payfailure' }, //超市三方平台
};

const payoff = (type, status) => {
  let map = { success: '/cashier/success', failure: '/cashier/failure', ...ROUTES[type] };
  return map[status];
};

export default payoff;
