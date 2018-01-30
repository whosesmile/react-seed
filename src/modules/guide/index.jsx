import './style.less';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NoMatch } from '../../components';
import Home from './home';
import Staff from './staff';
import Review from './review';
import Parcel from './parcel';
import Parcels from './parcels';
import Records from './records';
import Comment from './comment';
import Express from './express';

// 将组件打包 以便做代码分割 实现异步加载
const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/guide" component={Home} />
    <Route exact path="/guide/staff" component={Staff} />
    <Route exact path="/guide/parcels" component={Parcels} />
    <Route exact path="/guide/parcel/:id" component={Parcel} />
    <Route exact path="/guide/records" component={Records} />
    <Route exact path="/guide/comment/:id/:type?" component={Comment} />
    <Route exact path="/guide/review/:id" component={Review} />
    <Route exact path="/guide/express/:id" component={Express} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
