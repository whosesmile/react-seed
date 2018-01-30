import './style.less';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NoMatch } from '../../components';
import Home from './home';
import ToastExample from './toast';
import ModalExample from './modal';
import PopupExample from './popup';
import PickerExample from './picker';
import ActionSeetExample from './actionsheet';
import LoaderExample from './loader';
import ImageExample from './image';
import InputExample from './input';
import SwingExample from './swing';
import DistrictExample from './district';
import CouponExample from './coupon';
import AddressExample from './address';
import SwipeExample from './swipe';

// 将路由打包 (以便做代码分割 实现异步加载)
const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/example" component={Home} />
    <Route exact path="/example/modal" component={ModalExample} />
    <Route exact path="/example/toast" component={ToastExample} />
    <Route exact path="/example/popup" component={PopupExample} />
    <Route exact path="/example/picker" component={PickerExample} />
    <Route exact path="/example/actionsheet" component={ActionSeetExample} />
    <Route exact path="/example/loader" component={LoaderExample} />
    <Route exact path="/example/image" component={ImageExample} />
    <Route exact path="/example/input" component={InputExample} />
    <Route exact path="/example/swing" component={SwingExample} />
    <Route exact path="/example/district" component={DistrictExample} />
    <Route exact path="/example/coupon" component={CouponExample} />
    <Route exact path="/example/address" component={AddressExample} />
    <Route exact path="/example/swipe" component={SwipeExample} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
