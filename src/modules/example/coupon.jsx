import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/coupon';
import { View, Header, Footer, Title, Content, Coupon, Indicator, Widgets } from 'library';
import { Filter } from 'library/util';

class CouponExample extends Component {

  render() {
    let { showA, showB, showC, coupon, costs } = this.props;
    let { openCoupon, closeCoupon, chooseCoupon } = this.props.actions;

    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Coupon" />
        </Header>

        <Content>
          <div className="vspace text-center text-darkgray text-sm">
            <div className="divider">平台定价</div>
            <p className="text-dark">strategy:0</p>
            <p>skudata的格式中<b className="text-dark">不能</b>带有价格信息</p>

            <div className="list">
              <Indicator coupon={coupon} onClick={()=>openCoupon('showA')} />
            </div>
          </div>

          <div className="vspace text-center text-darkgray text-sm">
            <div className="divider">业态定价</div>
            <p className="text-dark">strategy:1</p>
            <p>skudata的格式中<b className="text-dark">必须</b>带有价格信息</p>

            <div className="list">
              <Indicator coupon={coupon} onClick={()=>openCoupon('showB')} />
            </div>
          </div>

          <div className="vspace text-center text-darkgray text-sm">
            <div className="divider">禁用询价</div>
            <p>默认会自动询价一次，并执行回调，但是第一个参数会为空，因为并没有选择任何千丁券</p>
            <p>有些产品需要用户填写价格，此时可以关闭初始询价</p>
            <p>inquiry:false</p>

            <div className="list">
              <Indicator coupon={coupon} onClick={()=>openCoupon('showC')} />
            </div>
          </div>

          <div className="vspace text-center text-darkgray text-sm">
            <div className="divider">自定义选择器</div>
            <p>绝大多数情况下，Indicator是可以满足需求的</p>
            <p>不过并不排除有时你需要自行定义结构</p>
            <div className="list">
              <div className="item" onClick={()=>openCoupon('showC')}>
                <div className="text">神马券</div>
                {!coupon && <span className="text-gray">请选择</span>}
                {coupon && <span className="text-driving">￥{coupon.price}元已用</span>}
                <i className="icon text-gray">&#xe61a;</i>
             </div>
            </div>
          </div>
        </Content>

        <Footer>
          <div className="button-group compact">
            <button className="button literal text-driving text-left">
              {!costs && <span className="text-loading text-gray"><i className="loading" />计价中</span>}
              {costs && <span>应付: {Filter.currency(costs.shouldPay)}</span>}
            </button>
            <button className="button driving square">提交订单</button>
          </div>
        </Footer>

        <Widgets>
          <Coupon {...{
            show: showA,
            selected: coupon ? coupon.code : null,
            business: 'NG',
            strategy: 0,
            inquiry: true,
            projectId: 1789,
            skudata: [
              { 'wareSkuId': 129070, 'wareCount': 1 },
              { 'wareSkuId': 123314, 'wareCount': 2 },
            ],
            dismiss: ()=>closeCoupon('showA'),
            callback:(coupon, costs)=>chooseCoupon('showA', coupon, costs),
          }} />

          <Coupon {...{
            show: showB,
            selected: coupon ? coupon.code : null,
            business: 'NG',
            strategy: 1,
            inquiry: true,
            projectId: 1789,
            skudata: [
              { 'wareSkuId': 129070, 'warePrice': '10.00', 'wareCount': 1 },
              { 'wareSkuId': 123314, 'warePrice': '20.00', 'wareCount': 2 },
            ],
            dismiss: ()=>closeCoupon('showB'),
            callback:(coupon, costs)=>chooseCoupon('showB', coupon, costs),
          }} />

          <Coupon {...{
            show: showC,
            selected: coupon ? coupon.code : null,
            business: 'NG',
            strategy: 1,
            inquiry: false,
            projectId: 1789,
            skudata: [
              { 'wareSkuId': 129070, 'warePrice': '10.00', 'wareCount': 1 },
              { 'wareSkuId': 123314, 'warePrice': '20.00', 'wareCount': 2 },
            ],
            dismiss: ()=>closeCoupon('showC'),
            callback:(coupon, costs)=>chooseCoupon('showC', coupon, costs),
          }} />
        </Widgets>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.coupon;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponExample);
