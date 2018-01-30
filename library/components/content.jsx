import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Header from './header';
import Footer from './footer';
import TabBar from './tabbar';
import { Env } from '../util';

class Content extends Component {

  static contextTypes = {
    elements: PropTypes.array.isRequired,
  };

  static propTypes = {
    coord: PropTypes.bool,
  };

  static defaultProps = {
    coord: false,
  };

  static childContextTypes = {
    content: PropTypes.object,
  };

  getChildContext() {
    return { content: this };
  }

  constructor(props, context) {
    super(props);
    this.events = [];
    this.state = {
      style: this.adjustMargin(context),
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      style: this.adjustMargin(nextContext),
    });
  }

  componentWillUnmount() {
    this.events.forEach(item => this.off.apply(this, item));
  }

  adjustMargin(context) {
    let style = {};
    React.Children.forEach(context.elements, item => {
      if (item) {
        if (item.type === Header && !Env.nested) {
          style.marginTop = 50;
        }
        if (item.type === Footer) {
          // 特殊处理TabBar 58px
          const hasTab = React.Children.toArray(item.props.children).find(item => {
            return item && item.type === TabBar;
          });
          style.marginBottom = hasTab ? 58 : 50;
        }
      }
    });
    return style;
  }

  on(name, callback, options) {
    if (this.panel) {
      if (name === 'ready') {
        return callback();
      }
      this.panel.addEventListener(name, callback, options);
    } else {
      this.events.push([name, callback, options]);
    }
  }

  off(name, callback, options) {
    if (this.panel) {
      this.panel.removeEventListener(name, callback, options);
    }
  }

  bindEvents = (panel) => {
    this.panel = panel;
    // bindEvents可能会被调用多次
    // 不过addEventListener浏览器自动优化,并不会重复注册
    this.events.forEach(item => this.on.apply(this, item));

    // 找到ready方法 并执行
    this.events.filter(item => item[0] === 'ready').forEach(item => item[1] && item[1]());
  }

  // 比较两个对象是否拥有完全一样的key和value
  // 注意: 这里有个假定是x,y拥有完全一样的key排序,否则需要先排序再比对
  // JSON.stringify({a:1, b:2}) !== JSON.stringify({b:2, a:1})
  compare(x, y) {
    return JSON.stringify(x) === JSON.stringify(y);
  }

  render() {
    const { coord, className, children, ...others } = this.props;
    return (
      <section ref={this.bindEvents} className={classnames('content',{coord: coord}, className)} {...others} style={this.state.style}>
        {children}
      </section>
    );
  }
}

export default Content;
