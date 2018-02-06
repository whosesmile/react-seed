import React, { Component } from 'react';
import classnames from 'classnames';
import { Env } from '../util';

class Title extends Component {

  constructor(props) {
    super(props);

    // 处理单页面应用的标题
    // iframe方案也许不再需要 微信已经修复了直接修改title的问题
    document.title = props.title;
  }

  // 更改标题
  componentWillReceiveProps(nextProps) {
    if (this.props.title !== nextProps.title) {
      document.title = nextProps.title;
    }
  }

  render() {
    if (Env.nested) return null;

    const { component, title, children, className, ...others } = this.props;
    const Tag = component || 'h1';
    return (
      <Tag className={classnames('title', className)} {...others}>
        {title && <b>{title}</b>}
        {children}
      </Tag>
    );
  }
}

class Header extends Component {

  render() {
    const { className, children, ...others } = this.props;

    // 内嵌不显示HEADER
    // 但是由于Title组件会处理单页面的document.title切换
    // 所以需要单独做一个处理
    if (Env.nested) {
      return React.Children.toArray(children).find(child => child.type === Title);
    }

    return (
      <header className={classnames('bar', className)} {...others}>
        {children}
      </header>
    );
  }
}

export default Header;

export { Title };
