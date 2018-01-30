/**
 * 弹窗
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import MaskLayer from './masklayer';

export default class Modal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.any,
    dismiss: PropTypes.func,
    buttons: PropTypes.array,
  };

  static defaultProps = {
    show: false,
    buttons: [],
  };

  render() {
    let { show, title, message, buttons, dismiss } = this.props;
    return (
      <CSSTransition in={show} unmountOnExit={true} classNames="ex-widget" timeout={300}>
        <MaskLayer dismiss={dismiss}>
          <div className="modal">
            { title &&
              <h3 className="title">{ title }</h3>
            }
            <div className="content">{ message }</div>

            <footer className="footer">
              <div className="button-group compact nesting">
                {
                  buttons.map((item, idx) => {
                    let { text, className='text-primary', onClick, ...others } = item;
                    let clazz = classnames('button square', className);
                    return (
                      <button key={ idx } className={ clazz } onClick={ onClick } { ...others }>{ text }</button>
                    );
                  })
                }
                </div>
            </footer>
          </div>
        </MaskLayer>
      </CSSTransition>
    );
  }
}
