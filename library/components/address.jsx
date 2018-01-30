/**
 * Address
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import BLink from './blink';
import { getAddress } from '../../src/redux';

class Address extends Component {

  static propTypes = {
    lock: PropTypes.bool, // 限定社区
    auto: PropTypes.bool, // 自动加载
    addr: PropTypes.bool, // 显示地址 (乐购物业自提不需要显示地址 防止歧义)
    callback: PropTypes.func.isRequired,
  };

  static defaultProps = {
    lock: false,
    auto: true,
    addr: true,
  };

  constructor(props) {
    super(props);
    this.state = {};

    if (props.address) {
      // 不限定社区 || 限定社区 但符合条件
      if (!props.lock || props.project.id == props.address.projectId) {
        this.state.address = props.address;
      }
    }
  }

  componentDidMount() {
    let { address, auto, callback } = this.props;
    // 如果存在合法地址
    if (this.state.address) {
      callback(this.state.address);
    }
    // 自动加载
    else if (!address && auto) {
      this.props.getAddress();
    }
  }

  componentWillReceiveProps(nextProps) {
    let { lock, project, callback } = this.props;
    if (nextProps.address) {
      // 不限定社区 || 限定社区 但符合条件
      if (!lock || project.id == nextProps.address.projectId) {
        this.setState({ address: nextProps.address });
        callback(nextProps.address);
      }
    }
  }

  render() {
    let { address } = this.state;
    let { lock, addr, className } = this.props;
    return (
      <BLink className={classnames('addrbar', className)} to={'/account/addresses/choose' + (lock ? '/lock' : '')} ui-mode="15px">
        <i className="icon text-xl text-darkgray">&#xe60d;</i>
        {!address &&
          <div className="text">
            <div className="text-gray text-sm">请选择收货地址</div>
          </div>
        }
        {address &&
          <div className="text">
            <p className="text-justify text-md">
              <span>{ address.name }</span>
              <span className="value text-right">{ address.mobile }</span>
            </p>
            {addr &&
              <p className="brief"><span>地址：{ address.addressStr || address }</span></p>
            }
          </div>
        }
        <i className="icon text-gray">&#xe61a;</i>
      </BLink>
    );
  }
}

const mapStateToProps = state => ({
  address: state.address,
  project: state.project,
});

const mapDispatchToProps = dispatch => ({
  getAddress: () => dispatch(getAddress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
