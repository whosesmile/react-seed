import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { skip as transpile, flatten } from '../util';

// 事件是否有特殊按键
const isModifiedEvent = e =>
  !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);

// 是否需要新开链接而不是SPA TODO
const blank = () => {
  return false;
};

class BLink extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    skip: PropTypes.bool, // skip跳转
    reload: PropTypes.bool, // 重复请求本页面
  };

  static defaultProps = {
    skip: false,
    reload: false,
  };

  // skip行为
  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    // 未阻止默认行为 仅监听左键点击 没有target属性 没有特殊按键
    if (!e.defaultPrevented && e.button === 0 && !this.props.target && !isModifiedEvent(e)) {
      e.preventDefault();
      // const { to, skip, replace } = this.props;
      // go(skip ? transpile(to) : to, replace);
      location.href = transpile(this.props.to);
    }
  }

  // 重复地址不刷新
  preventReload = (e) => {
    const { to, reload } = this.props;
    const { router } = this.context;
    if (!reload && flatten(router.history.location) === flatten(to)) {
      e.preventDefault();
    }
  }

  render() {
    const { to, skip, reload, children, replace, ...others } = this.props;
    // skip model
    if (skip) {
      let href = transpile(to);
      // 没有数据
      if (!href) {
        /* eslint-disable no-console */
        return (<a { ...others } onClick={ ()=> console.log('TODO') }>{children}</a>);
      }
      // 可能是方法
      if (typeof href === 'function') {
        return (<a {...others} onClick={href}>{children}</a>);
      }
      return (<a href={href} {...others} onClick={this.handleClick}>{children}</a>);
    }
    // 新开
    else if (blank()) {
      return (
        <Link to={flatten(to)} replace={replace} target="_self" {...others}>{children}</Link>
      );
    }
    // 默认
    else {
      return (
        <Link to={flatten(to)} replace={replace} {...others} onClick={this.preventReload}>{children}</Link>
      );
    }
  }
}

export default BLink;
