/**
 * 遮罩容器
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MaskLayer extends Component {

  static propTypes = {
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    transparent: false,
  };

  // 仅限点击遮罩
  delegate(fn) {
    return e => {
      if (e.target === this.mask) {
        return fn && fn();
      }
    };
  }

  render() {
    let { transparent, dismiss, className, ...others } = this.props;
    let clazz = classnames('ex-widget-layer', {
      'transparent': transparent,
    }, className);

    return (
      <div ref={n => this.mask = n} className={ clazz } onClick={ this.delegate(dismiss) } {...others}>
        { this.props.children }
      </div>
    );
  }
}

export default MaskLayer;
