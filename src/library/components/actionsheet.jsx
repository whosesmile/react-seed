/**
 * ActionSheet
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import MaskLayer from './masklayer';

export default class ActionSheet extends Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.any,
    dismiss: PropTypes.func,
    buttons: PropTypes.array.isRequired,
  };

  static defaultProps = {
    show: false,
  };

  render() {
    let { show, title, message, buttons, dismiss, ...others } = this.props;
    return (
      <CSSTransition in={show} unmountOnExit={true} classNames="ex-widget" timeout={300}>
        <MaskLayer dismiss={dismiss}>
          <div className="actionsheet" { ...others }>
            {/* HEADER */}
            { (title || message) &&
              <header className="header">
                { title && <h4>{ title }</h4> }
                { message }
              </header>
            }

            {/* BUTTONS */}
            {
              buttons.map((group, idx) => {
                return (
                  <div key={ idx } className="menus">
                    {
                      group.map((button, index) => {
                        let { text, className, onClick, ...rest } = button;
                        let clazz = classnames('item', className);

                        return (
                          <div key={ index } className={ clazz } onClick={ onClick } { ...rest }>{ text }</div>
                        );
                      })
                    }
                  </div>
                );
              })
            }
          </div>
        </MaskLayer>
      </CSSTransition>
    );
  }
}
