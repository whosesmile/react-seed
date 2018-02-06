/**
 * 吐司
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import MaskLayer from './masklayer';

export default class Toast extends Component {

  static propTypes = {
    show: PropTypes.bool,
    modal: PropTypes.bool,
    icon: PropTypes.string,
    message: PropTypes.string,
  };

  static defaultProps = {
    show: false,
    // 默认模态吐司 如果希望镂空 需要传递false
    modal: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      presets: {
        success: '&#xe61c;',
        failure: '&#xe61d;',
        warning: '&#xe601;',
      },
    };
  }

  componentWillUnmount() {}

  renderIcon() {
    let icon = this.props.icon;
    // PRESET ICON
    if (Object.keys(this.state.presets).indexOf(icon) !== -1) {
      return (<i className="icon" dangerouslySetInnerHTML={{__html: this.state.presets[icon]}} />);
    }
    // LOADING
    if (icon === 'loading') {
      return (<i className="icon waiting" />);
    }
    // OTHER ICON
    if (/^&#\w+;$/.test(icon)) {
      return (<i className="icon" dangerouslySetInnerHTML={{__html: icon}} />);
    }
    // IMAGE ICON
    if (/^(https?)?\/\//.test(icon)) {
      return (<i className="icon"><img src={ icon } /></i>);
    }
    // DEFAULT ICON
    return (<i className="icon">&#xe601;</i>);
  }

  renderToast() {
    let { modal, icon, message } = this.props;

    const jsxComponent = (
      <div className="toast" data-show={this.state.show}>
        <div>
          { this.renderIcon() }
          {message && icon !== 'loading' && <span className="text">{message}</span>}
        </div>
      </div>
    );

    return modal ? <MaskLayer transparent={true}>{jsxComponent}</MaskLayer> : jsxComponent;
  }

  render() {
    let { show } = this.props;
    return (
      <CSSTransition in={show} unmountOnExit={true} classNames="ex-widget" timeout={300}>
        {this.renderToast()}
      </CSSTransition>
    );
  }
}
