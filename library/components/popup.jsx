/**
 * 浮窗
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import MaskLayer from './masklayer';

export default class Popup extends Component {
  static propTypes = {
    show: PropTypes.bool,
    dismiss: PropTypes.func,
  };

  static defaultProps = {
    show: false,
  };

  render() {
    let { show, dismiss, className, children, ...others } = this.props;
    let clazz = classnames('popup', className);
    return (
      <CSSTransition in={show} unmountOnExit={true} classNames="ex-widget" timeout={300}>
        <MaskLayer dismiss={ dismiss }>
          <div className={ clazz } { ...others }>
            { children }
          </div>
        </MaskLayer>
      </CSSTransition>
    );
  }
}

export class PopupHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    labels: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  static defaultProps = {
    labels: { cancel: '取消', confirm: '确定' },
  };

  render() {
    let { title, labels, onCancel, onConfirm } = this.props;
    return (
      <div className="header">
        { labels.cancel && onCancel &&
          <a className="button literal inline text-nm text-gray" onClick={ onCancel }>{ labels.cancel }</a>
        }
        <h4 className="title">{ title }</h4>
        { labels.confirm && onConfirm &&
          <a className="button literal inline text-nm text-driving" onClick={ onConfirm }>{ labels.confirm }</a>
        }
      </div>
    );
  }
}
