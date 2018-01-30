import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Widgets from './widgets';
import Toast from './toast';
import Modal from './modal';
import { Env } from '../util';

class View extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    elements: PropTypes.array,
  };

  getChildContext() {
    return { elements: this.props.children };
  }

  // 是否是前台页面(切换页面动画过度时，会导致两个页面共存一小段时间)
  isActived() {
    const { location } = this.context.router.history;
    if (!Env.is('browser')) return false;
    // 推荐使用key来判定
    if (location.key && window.history.state) {
      return location.key === window.history.state.key;
    }
    // 由于key可能不存在 再使用pathname判断
    // 如果两次页面的pathname一致，则会有误差
    // 因为使用href也一样，因为也可能会重复，这里不再处理了就
    else {
      return location.pathname === window.location.pathname;
    }
  }

  render() {
    const { toast, modal, dispatch, className, children, ...others } = this.props;
    return (
      <div className={classnames('view', className)} {...others}>
        {children}
        <Widgets>
          <Toast {...toast} show={toast.show && this.isActived()} />
          <Modal {...modal} show={modal.show && this.isActived()} />
        </Widgets>
      </div>
    );
  }
}

const mapStateToProps = state => state.widgets;
export default connect(mapStateToProps)(View);
