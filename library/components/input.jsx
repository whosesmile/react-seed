/**
 * Input 带关闭
 */
import React, { Component } from 'react';
import classnames from 'classnames';

export default class Input extends Component {

  clear = () => {
    let input = this.input;
    let lastValue = input.value;
    input.value = '';
    input.focus();

    let event = this.createEvent('input', { bubbles: true });
    // hack React15
    event.simulated = true;
    // hack React16 内部定义了descriptor拦截value，此处重置状态
    let tracker = input._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
  }

  // 兼容处理
  createEvent(name, params) {
    if (typeof Event === 'function') {
      return new Event(name, params);
    } else {
      let event = document.createEvent('Event');
      event.initEvent(name, params.bubbles, params.cancelable);
      return event;
    }
  }

  render() {
    let { className, ...others } = this.props;
    let clazz = classnames('input', className);

    return (
      <div className="input-widget">
        <input ref={input => this.input = input} className={ clazz } { ...others } required />
        <i className="icon text-gray" onClick={ this.clear }>&#xe61d;</i>
      </div>
    );
  }
}
