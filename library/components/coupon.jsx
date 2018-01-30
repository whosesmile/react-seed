/**
 * 千丁券
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popup, { PopupHeader } from './popup';
import { Filter, Emitter } from '../util';
import { actions } from '../../src/redux';

// 使用事件机制 来实现跨组件通信
const carry = new Emitter();

class Coupon extends Component {

  static propTypes = {
    show: PropTypes.bool,
    business: PropTypes.string.isRequired,
    skudata: PropTypes.array.isRequired,
    dismiss: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    strategy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    ordercode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inquiry: PropTypes.bool, // 初始化时是否询价 默认询价
  };

  static defaultProps = {
    show: false,
    inquiry: true,
    selected: null,
    ordercode: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      skudata: this.props.skudata,
      selected: this.props.selected,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    // 初始化时是否需要询价
    if (this.props.inquiry) {
      this.inquiryCosts();
    }

    axios.get('/cashier/ajax/coupons', {
      params: {
        strategy: this.props.strategy,
        business: this.props.business,
        projectId: this.props.projectId,
        ordercode: this.props.ordercode,
        skudata: JSON.stringify(this.state.skudata),
      },
      global: false,
    }).then(({ data }) => {
      let list = data.common;
      let unavailable = data.unavailable;
      this.setState({
        list,
        unavailable,
        loading: false,
      });
      // 通过事件发送通知
      carry.emit('fetch', list);
    }).catch(() => {
      this.setState({
        list: [],
        unavailable: [],
        loading: false,
      });
    });
  }

  // 询价
  inquiryCosts(coupon, event) {
    // 找到所选的input
    let target = event && event.target;

    // 重复选择 不做处理
    if (coupon && coupon.code === this.state.selected) {
      return this.props.callback(coupon, this.state.costs);
    }
    // 查询定价
    axios.get('/cashier/ajax/inquiry', {
      params: {
        coupon: coupon ? coupon.code : null,
        strategy: this.props.strategy,
        business: this.props.business,
        ordercode: this.props.ordercode,
        projectId: this.props.projectId,
        skudata: JSON.stringify(this.state.skudata),
      },
    }).then(({ data }) => {
      this.setState({
        selected: coupon ? coupon.code : null,
        costs: data.entity,
      }, () => {
        this.props.callback(coupon, data.entity);
      });
    }).catch(({ data = {} }) => {
      // 取消选择
      if (target) {
        target.checked = false;
      }
      const { actions } = this.props;
      actions.openModal({
        title: '抱歉',
        message: data.message || '当前订单不能使用这张千丁券',
        buttons: [{
          text: '确定',
          onClick: () => actions.closeModal(),
        }],
      });
    });
  }

  renderPiece(list, disabled) {
    let { selected } = this.state;
    return list.map((item, idx) => {
      return (
        <label key={ idx } className="item tapable forlab">
          <input className="checkbox" type="radio" name="paytype" disabled={disabled} defaultChecked={ selected == item.code } onClick={ this.inquiryCosts.bind(this, item) } />
          <h3 className={classnames({'text-gray': disabled, 'text-driving': !disabled})}>{ item.price }</h3>
          <div className="text text-md">
            <h4 className="text-ellipsis text-darkgray">{ item.batchName }</h4>
            <div className="brief">{ Filter.date(item.startTime, 'yyyy/MM/dd') } ~ { Filter.date(item.endTime, 'yyyy/MM/dd') }</div>
          </div>
          <i className="icon text-gray">&#xe61a;</i>
        </label>
      );
    });
  }

  renderComponent() {
    let { list, unavailable } = this.state;

    // 尚未加载
    if (!list) {
      return (
        <div className="content">
          <div className="loadmore">
            <i className="loading" />
            <span className="tips text-gray">正在加载</span>
          </div>
        </div>
      );
    }

    // 没有任何券
    if (list.length === 0 && unavailable.length === 0) {
      return (
        <div className="content">
          <div className="vspace hspace text-center text-md text-gray">
            您没有可用的千丁券
          </div>
        </div>
      );
    }

    return (
      <div className="content">
        { list.length > 0 &&
          <div className="list compact">
            {this.renderPiece(list, false)}
          </div>
        }
        { unavailable.length > 0 &&
          <div>
            <div className="divider" ui-mode="0%">以下千丁券不符合使用条件</div>
            <div className="list compact">
              {this.renderPiece(unavailable, true)}
            </div>
          </div>
        }
      </div>
    );
  }

  render() {
    return (
      <Popup show={this.props.show} className="coupon" dismiss={this.props.dismiss}>
        <PopupHeader title="使用千丁券" />
        {this.renderComponent()}
      </Popup>
    );
  }
}

class Indicator extends Component {

  static propTypes = {
    coupon: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    carry.on('fetch', list => {
      this.setState({ list });
    });
  }

  indicator() {
    let { list } = this.state;
    let { coupon } = this.props;

    // 已选
    if (coupon) {
      return (<span className="text-driving">￥{coupon.price}元已用</span>);
    }
    // 正在刷新券
    else if (!list) {
      return (
        <div className="loadmore">
          <i className="loading" />
        </div>
      );
    }
    // 不存在可用券
    else if (list.length === 0) {
      return (<div className="text-gray text-md">无可用券</div>);
    }
    // 存在可用券
    else if (list.length > 0) {
      return (<div className="text-gray">您有{ list.length }张千丁券</div>);
    }
    // 好吧，请选择(不会走到这)
    else {
      return (<span className="text-gray">请选择</span>);
    }
  }

  render() {
    let { list } = this.state;
    let { className, coupon, dispatch, ...others } = this.props;
    return (
      <div className={classnames('item', className)} {...others}>
        <div className="text">千丁券</div>
        {this.indicator()}
        {list && <i className="icon text-gray">&#xe61a;</i>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(Coupon);
export { Indicator };
