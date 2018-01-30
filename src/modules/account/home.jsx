import style from './style.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Header, Footer, Title, Content, BLink, TabBar } from 'library';
import { Filter, JSBridge } from 'library/util';
import { actions } from './ducks/home';

class Home extends Component {

  componentDidMount() {
    let { member, wallet, actions, property } = this.props;
    // 已登录用户加载钱包数据
    if (member.memberId && !wallet) {
      actions.fetchWallet();
    }
    // 龙湖物业检测 客服电话会不同
    if (!property) {
      actions.fetchProperty();
    }
  }

  // 客服电话
  getKFMobile() {
    let { property = [] } = this.props;
    let isLH = property.findIndex(item => item.content == 'PROJECT_LH' && item.subType == 1);
    return isLH !== -1 ? '400-708-0080' : '400-081-8181';
  }

  render() {
    let { member, project, wallet } = this.props;

    return (
      <View className={style.home}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="我的" />
        </Header>

        <Content>
          <BLink className="banner" to="/account/settings">
            <div className="list compact">
              <div className="item">
                <div className="avatar">
                  <img width="60" src={ Filter.figure(member.memberAvatar, 120, 120) } />
                </div>
                <div className="text text-md">
                  <h4>{ member.memberName || '访客' }</h4>
                  <div className="brief">{ member.memberMobile }</div>
                </div>
                <i className="icon text-white">&#xe61a;</i>
              </div>
            </div>
          </BLink>

          <div className="list compact">
            <a className="item" href="/wallet">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/image-4e820acc-09a5-41df-952d-67ad09c69f5b.png" />
              </div>
              <span className="text">我的钱包</span>
              { wallet && wallet.slogan.length > 0 &&
                <span className="extra text-sm"><span className="text-driving">{ wallet.slogan[0] }</span></span>
              }
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <div className="item thread split text-sm" ui-mode="10px 0px">
              <a className="text text-dark text-center" href="/wallet/records">
                <p>{ Filter.currency(wallet ? wallet.account.availableAmount : 0, 2) }</p>
                <p>账户余额</p>
              </a>
              <BLink className="text text-dark text-center" to="/integral">
                <p>{ wallet ? wallet.accountIntegral : 0 }</p>
                <p>我的积分</p>
              </BLink>
              <BLink className="text text-dark text-center" to="/account/coupons">
                <p>{ Filter.currency(wallet ? wallet.accountQdTicket : 0, 2) }</p>
                <p>千丁券</p>
              </BLink>
            </div>
          </div>

          <div className="list">
            <a className="item" href="/location">
              <i className="icon">&#xe62a;</i>
              <div className="text">我的社区</div>
              <span className="extra">{ project.name }</span>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>

          <div className="list">
            <BLink className="item" to="/account/orders">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/899826a5bde2edb56611b67b0ba7c7ae.png" />
              </div>
              <div className="text">我的订单</div>
              <i className="icon text-gray">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/account/addresses">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/41a2bbb947f173727de845f70f7c36ab.png" />
              </div>
              <div className="text">收货地址</div>
              <i className="icon text-gray">&#xe61a;</i>
            </BLink>
            <a className="item" href="/shopping/cart">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/f15e58120c2c48a10ea98680ec7eb1b5.png" />
              </div>
              <div className="text">我的购物车</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>

          <div className="list">
            <a className="item" onClick={()=>JSBridge.meiqia()}>
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/8831d827cfbbae61cc86183f905a7354.png" />
              </div>
              <div className="text">在线客服</div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            <a className="item" href={ `tel:${this.getKFMobile()}` }>
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/b5704e34f73d3b70593934548a771b5c.png" />
              </div>
              <div className="text">客服热线</div>
              <span className="text text-right">{ this.getKFMobile() }</span>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>
        </Content>

        <Footer>
          <TabBar type="account" />
        </Footer>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modules.account.home,
  member: state.member,
  project: state.project,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
