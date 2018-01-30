/**
 * 悬挂功能
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Env, getOffset } from '../util';

export default class Swing extends Component {

  static contextTypes = {
    content: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
      threshold: 0,
    };
  }

  componentDidMount() {
    if (Env.is('browser')) {
      window.addEventListener('resize', this.reposition);
      this.context.content.on('scroll', this.handler);
      this.context.content.on('ready', this.reposition);
    }
  }

  componentWillUnmount() {
    if (Env.is('browser')) {
      window.removeEventListener('resize', this.reposition);
      this.context.content.off('scroll', this.handler);
      this.context.content.off('ready', this.reposition);
    }
  }

  // 计算元素初始位置
  reposition = () => {
    let panel = this.context.content.panel;
    if (panel) {
      // 由于FIXED定位导致无法计算原始高度
      // 为了准确计算高度，先取消fixed定位
      let classList = this.node.classList;
      // 先检查兼容
      if (classList) {
        let contains = this.node.classList.contains('fixed');
        this.node.classList.remove('fixed');
        this.node.style.height = this.node.offsetHeight + 'px';
        if (contains) this.node.classList.add('fixed');
      }
      // 不兼容偷懒放弃掉
      else {
        this.node.style.height = this.node.offsetHeight + 'px';
      }

      // 更新临界值后 重新计算是否固定
      this.setState({
        threshold: getOffset(this.node, panel).top,
      }, this.handler);
    }
  }

  // 计算容器滚动距离
  handler = () => {
    let panel = this.context.content.panel;
    if (panel) {
      this.setState({
        fixed: panel.scrollTop >= this.state.threshold,
      });
    }
  }

  render() {
    let { className } = this.props;
    let clazz = classnames('swing', className, { fixed: this.state.fixed, nested: Env.nested });
    return (
      <div ref={node=>this.node=node} className={ clazz }>
        <div className="tablet">
          { this.props.children }
        </div>
      </div>
    );
  }
}
