import './style.less';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NoMatch } from '../../components';
import Home from './home';
import Success from './success';
import Failure from './failure';

// 将路由打包 (以便做代码分割 实现异步加载)
const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/cashier/payment" component={Home} />
    <Route exact path="/cashier/success" component={Success} />
    <Route exact path="/cashier/failure" component={Failure} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
