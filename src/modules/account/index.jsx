import './style.less';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NoMatch } from '../../components';
import Home from './home';
import Orders from './orders';
import Address from './address';
import Addresses from './addresses';
import Coupons from './coupons';
import Protocol from './protocol';
import Coupon from './coupon';
import Settings from './settings';

// 将路由打包 (以便做代码分割 实现异步加载)
const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/account" component={Home} />
    <Route exact path="/account/orders" component={Orders} />
    <Route exact path="/account/address/:id?" component={Address} />
    <Route exact path="/account/addresses/:choose?/:lock?" component={Addresses} />
    <Route exact path="/account/settings" component={Settings} />
    <Route exact path="/account/coupons" component={Coupons} />
    <Route exact path="/account/coupon/protocol" component={Protocol} />
    <Route exact path="/account/coupon/:code" component={Coupon} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
