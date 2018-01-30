import style from './style.less';
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Header, Title, Content, BLink, Loader, Widgets, Popup, PopupHeader, Aux } from 'library';
import { JSBridge, Filter } from 'library/util';
import { actions } from './ducks/orders';

class Order extends Component {

  details() {
    let { order } = this.props;
    let goods = order.orderGoods;

    // 单商品订单
    if (goods.length === 1) {
      return (
        <Aux>
          <div className="avatar">
            <img width="60" height="60px" src={ Filter.thumb(goods[0].skuImgUrl[0], 60, 60) } />
          </div>
          <div className="text">
            <h4 className="text-ellipsis">{ goods[0].goodsName }</h4>
            <div className="brief truncate">{ Filter.truncate(goods[0].goodsDesc, 50) }</div>
          </div>
        </Aux>
      );
    }
    // 多商品订单
    else {
      return goods.slice(0, 4).map((item, idx) => (
        <div key={ idx } className="avatar">
          <img width="60" height="60px" src={ Filter.thumb(item.skuImgUrl[0], 60, 60) } />
        </div>
      ));
    }
  }

  render() {
    let { order } = this.props;

    return (
      <div key={ order.orderCode } className="list">
        <div className="item text-md">
          <div className="text">{ order.businessName }</div>
          <div className="extra">{ order.orderStatusName }</div>
        </div>

        <BLink className="item" ui-mode="15px" skip to={order.skipModel}>
          {this.details()}
        </BLink>

        <div className="item">
          <div className="text text-sm">价格: <span className="text-driving">{ Filter.currency(order.shouldPay) }</span></div>
          <div className="extra">
            <div className="button-group">
              {
                // 操作列表: btnType[按钮类型][1:支付按钮, 0:其他按钮](Integer)
                order.btnSkipList.map(btn => {
                  const code = order.orderCode;
                  const price = order.shouldPay;
                  const business = order.businessType;
                  if (btn.btnType == 1) {
                    return (<div key={code} className="button driving sm" onClick={()=>JSBridge.payment({code, price, business})}>{btn.btnName}</div>);
                  }
                  else {
                    return (<BLink key={code} className="button driving sm" skip to={btn.skipModel}>{btn.btnName}</BLink>);
                  }
                })
              }
              <BLink className="button default sm" skip to={order.skipModel}>查看详情</BLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      business: null,
      botypes: [{ name: '全部服务', type: null }],
      odtypes: [{ name: '全部订单', type: 0 }, { name: '代付款', type: 1 }, { name: '待评价', type: 2 }],
    };
  }

  componentDidMount() {
    axios.get('/account/ajax/botypes', { global: false }).then(({ data }) => {
      this.setState({
        botypes: this.state.botypes.concat(data.list.map((item) => {
          return { name: item.businessName, type: item.businessType };
        })),
      });
    });
  }

  openWidget(key) {
    this.setState({
      [key]: true,
    });
  }

  closeWidget(key) {
    this.setState({
      [key]: false,
    });
  }

  loaderCallback = (list) => {
    this.props.actions.fetchOrders(list);
  }

  // 更改订单分类
  filterType(type) {
    this.setState({ type });
    this.closeWidget('showB');
  }

  // 更改业态类型
  filterBusiness(business) {
    this.setState({ business });
    this.closeWidget('showA');
  }

  render() {
    let { orders } = this.props;
    let { showA, showB, type, business, botypes, odtypes } = this.state;

    return (
      <View className={style.orders}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="我的订单" />
        </Header>

        <Content>
          <div className="flex compact filters text-md">
            <div className="item" onClick={ ()=> this.openWidget('showA') }>
              <span>{ (botypes.find((item) => item.type == business) || botypes[0]).name }</span>
              <i>&#9660;</i>
            </div>
            <div className="item" onClick={ ()=> this.openWidget('showB') }>
              <span>{ (odtypes.find((item) => item.type == type) || odtypes[0]).name }</span>
              <i>&#9660;</i>
            </div>
          </div>

          <Loader url="/account/ajax/orders" query={ {business: business, type: type} } list={orders} callback={this.loaderCallback}>
            { orders.map(order => <Order key={order.orderCode} order={order} />) }
          </Loader>
        </Content>

        <Widgets>
          <Popup show={showA} dismiss={()=>this.closeWidget('showA')}>
            <PopupHeader title="业态类型" />
            <div className="content">
              <div className="menus">
                {
                  botypes.map((item, idx) => (
                    <a key={ idx } className={classnames({selected: item.type == business})} onClick={ this.filterBusiness.bind(this, item.type) }>
                      <span>{ item.name }</span>
                    </a>
                  ))
                }
              </div>
            </div>
          </Popup>

          <Popup show={showB} dismiss={()=>this.closeWidget('showB')}>
            <PopupHeader title="订单状态" />
            <div className="content">
              <div className="menus">
                {
                  odtypes.map((item, idx) => (
                    <a key={ idx } className={classnames({selected: item.type == type})} onClick={ this.filterType.bind(this, item.type) }>
                      <span>{ item.name }</span>
                    </a>
                  ))
                }
              </div>
            </div>
          </Popup>
        </Widgets>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modules.account.orders,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
