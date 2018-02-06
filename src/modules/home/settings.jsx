import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/settings';
import { View, Header, Title, Footer, Content, BLink } from 'library';

class Settings extends Component {

  componentDidMount() {
    // 是否已经存在数据
    let { list } = this.props;
    if (!list.length) {
      this.props.actions.fetchList();
    }
  }

  render() {
    let { list } = this.props;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="设置" />
        </Header>
        <Content>
          <div className="list compact overlap">
            <BLink className="item" to="/account/orders">
              <span className="text">我的订单</span>
              <span className="extra">异步载入子模块</span>
              <i className="icon text-gray">&#xe61a;</i>
            </BLink>
          </div>

          <div className="list">
            <BLink className="item" to="/example">
              <span className="text">组件使用范例</span>
              <span className="extra">异步载入子模块</span>
              <i className="icon text-gray">&#xe61a;</i>
            </BLink>
          </div>

          { list.map((item, idx) => (
              <div key={idx} className="list">
                <div className="item">
                  <div className="label text-gray">付款金额</div>
                  <div className="text text-right">￥869.00</div>
                </div>
                <div className="item">
                  <div className="text">
                    <p className="text-justify">
                      <span className="label text-gray">商品</span>
                      <span className="value text-right">飞利浦空气炸锅</span>
                    </p>
                    <p className="text-justify">
                      <span className="label text-gray">商家</span>
                      <span className="value text-right">飞利浦天猫旗舰店</span>
                    </p>
                    <p className="text-justify">
                      <span className="label text-gray">颜色分类</span>
                      <span className="value text-right">白色</span>
                    </p>
                  </div>
                </div>
                <div className="item thread" ui-mode="0px">
                  <div className="button-group compact nesting">
                    <a className="button up square text-success text-nm">付款</a>
                  </div>
                </div>
              </div>
            ))
          }
        </Content>
        <Footer>
          <div className="cell">
            <img width="24" height="24" src="//img1.qdingnet.com/728ae837b248f318757bb47eddadf622.png" />
          </div>
          <div className="cell">
            <img width="24" height="24" src="//img1.qdingnet.com/705aed821745754bc94eab423f40fb4c.png" />
          </div>
          <div className="button-group compact">
            <button className="button guiding square text-sm">加入购物车</button>
            <button className="button driving square text-sm">立即购买</button>
          </div>
        </Footer>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.home.settings;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
