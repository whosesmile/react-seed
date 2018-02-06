import React from 'react';
import { Router } from 'react-router';
import Env from './env';

// 修改原型链的listen方法，让它延迟执行
Router.prototype.componentWillMount = function() {

  let { children, history } = this.props;

  if (children != null && React.Children.count(children) > 1) {
    throw new Error('A <Router> may have only one child element');
  }

  // 延迟执行 防止UI提前渲染 导致动画抖动
  this.unlisten = history.listen(() => {
    // 仅修改浏览器环境代码
    if (Env.is('browser')) {
      setTimeout(() => {
        this.setState({
          match: this.computeMatch(history.location.pathname)
        });
      }, 0);
    }
    // 服务端渲染依然走原有代码
    else {
      this.setState({
        match: this.computeMatch(history.location.pathname)
      });
    }
  });
};
