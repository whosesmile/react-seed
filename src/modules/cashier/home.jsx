import style from './style.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/home';
import { View, Header, Footer, Title, Content, Toast, Modal, Aux, Widgets } from 'library';
import { Env, Filter, payoff, decodeQuery, encodeQuery } from 'library/util';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      query: {},
      loading: true,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const { search } = this.props.location;
    const query = decodeQuery(search);

    // 参数检查
    if (!query.code || !query.price || !query.business) {
      return actions.openModal({
        title: '数据异常',
        message: '缺少必要的支付参数，无法支付',
        buttons: [{
          text: '关闭',
          onClick: actions.closeModal,
        }],
      });
    }

    axios.get('/cashier/ajax/method', {
      params: query,
      cache: true,
    }).then(({ data }) => {
      // 是否丢失默认支付 (钱包被禁用,微信支付不可用等)
      let lost = false;

      // 过滤在线支付
      data.onlinePayMethods = data.onlinePayMethods.filter(item => {
        // 支付宝支付 微信平台不能显示
        if (item.type === 31 && Env.is('wx')) {
          lost = item.defaultFlag === 1 || lost;
          return false;
        }
        // 微信支付 非微信平台不显示
        else if (item.type === 51 && !Env.is('wx')) {
          lost = item.defaultFlag === 1 || lost;
          return false;
        }
        return true;
      });

      // 过滤虚拟支付
      data.virtualPayMethods = data.virtualPayMethods.filter(item => {
        // H5不支持亲情付
        if (item.type !== 61) {
          lost = item.defaultFlag === 1 || lost;
          return false;
        }
        // 钱包支付可能被禁用
        else if (data.walletStatus.status === 0) {
          lost = item.defaultFlag === 1 || lost;
          item.defaultFlag = 0;
          return true;
        }
        return true;
      });

      // 将所有支付方式合并在一起: 在线支付, 虚拟支付, 离线支付
      let list = [...data.onlinePayMethods, ...data.virtualPayMethods, ...data.offlinePayMethods];
      let wallet = data.walletStatus;

      // 防止缺失默认支付方式
      if (lost) {
        // 钱包可能被冻结 所以不能直接取
        let method = list.find(item => item.type !== 61 || wallet.status !== 0);
        if (method) {
          method.defaultFlag = 1;
          lost = false;
        }
      }

      this.setState({
        list,
        wallet,
        query,
        lost,
        loading: false,
      });
    });
  }

  // 更改支付方式
  handleChange(method) {
    this.setState({
      list: this.state.list.map(item => {
        item.defaultFlag = item === method ? 1 : 0;
        return item;
      }),
    });
  }

  // 支付执行入口
  handlePayment = () => {
    let method = this.state.list.find(item => item.defaultFlag === 1);
    if (!method) {
      return this.props.actions.openToast({
        icon: 'failure',
        message: '请选支付方式',
      });
    }

    // 现金支付
    if (method.type === 11) {
      this.handleCash(method);
    }
    // 刷卡支付
    else if (method.type === 21) {
      this.handleCard(method);
    }
    // 支付宝
    else if (method.type === 31) {
      this.handleAlipay(method);
    }
    // 微信支付
    else if (method.type === 51) {
      this.handleWeixin(method);
    }
    // 钱包支付
    else if (method.type === 61) {
      this.handleWallet(method);
    }
    // 其他方案
    else {
      this.handleOthers(method);
    }
  }

  // 现金支付
  handleCash() {
    let { actions, history } = this.props;
    actions.openModal({
      title: '现金支付',
      message: '您需要前往物业中心现金支付',
      buttons: [{
        text: '其他方式',
        onClick: actions.closeModal,
      }, {
        text: '查看订单',
        onClick: () => {
          actions.closeModal();
          history.push('/account/orders');
        },
      }]
    });
  }

  // 刷卡支付
  handleCard() {
    let { actions, history } = this.props;
    actions.openModal({
      title: '刷卡支付',
      message: '您需要前往物业中心刷卡支付',
      buttons: [{
        text: '其他方式',
        onClick: actions.closeModal,
      }, {
        text: '查看订单',
        onClick: () => {
          actions.closeModal();
          history.push('/account/orders');
        },
      }]
    });
  }

  // 支付宝
  handleAlipay() {
    axios.get('/cashier/ajax/alipay', {
      params: {
        code: this.state.query.code,
      },
    }).then(({ data }) => {
      // 跳转到支付宝H5付款链接
      location.href = data.url;
    });
  }

  // 微信支付
  handleWeixin() {
    axios.get('/cashier/ajax/weixin', {
      params: {
        code: this.state.query.code,
      },
    }).then(({ data }) => {
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, (status) => {
        if (status.err_msg === 'get_brand_wcpay_request:ok') {
          this.handleFeedback('success');
        } else {
          this.handleFeedback('failure');
        }
      });
    });
  }

  // 钱包支付
  handleWallet() {
    let password = null;
    let { actions } = this.props;
    let { query, wallet } = this.state;

    // 调用支付
    let payment = () => {
      // CLOSE GLOBAL, SO SELF HANDLE TOAST LOADING
      const TIMEOUT_MAX = Math.pow(2, 31) - 1;
      actions.openToast({ icon: 'loading', modal: true }, TIMEOUT_MAX);
      axios.post('/cashier/ajax/wallet', {
        code: query.code,
        password: password,
      }, {
        // 支付失败不希望触发全局的弹窗提醒
        global: false,
      }).then(() => {
        this.handleFeedback('success');
      }, () => {
        this.handleFeedback('failure');
      }).finally(actions.closeToast);
    };

    // 被冻结
    if (wallet.status == 0) {
      return actions.openToast({
        icon: 'failure',
        message: '账户已被冻结',
      });
    }
    // 有密码
    else if (wallet.status == 1) {
      actions.openModal({
        title: '请输入支付密码',
        message: (
          <div className="list compact wallet">
            <label className="item">
              <span className="label">密码</span>
              <div className="text">
                <input className="input" type="password" pattern="[0-9]*" placeholder="请输入您的支付密码" maxLength="6" onChange={ e => password=e.target.value } />
              </div>
            </label>
            <div className="item-divider">
              <div className="text text-center text-driving">提醒: 您正在进行付款操作</div>
            </div>
          </div>),
        buttons: [{
          text: '取消',
          onClick: actions.closeModal,
        }, {
          text: '确定',
          onClick: () => {
            // 空密码
            if (!password) {
              return actions.openToast({
                icon: 'failure',
                message: '请输入密码'
              });
            }
            payment();
            actions.closeModal();
          },
        }]
      });
    }
    // 没密码
    else if (wallet.status == 2) {
      payment();
    }
  }

  // 支付回调处理
  handleFeedback(type) {
    let { query } = this.state;
    let { history } = this.props;
    history.push({
      pathname: payoff(query.business, type),
      search: encodeQuery(query),
    });
  }

  // 物业交费
  handleOthers() {
    let { actions, history } = this.props;
    actions.openModal({
      title: '物业前台',
      message: '您需要前往物业中心当面支付',
      buttons: [{
        text: '其他方式',
        onClick: actions.closeModal,
      }, {
        text: '查看订单',
        onClick: () => {
          actions.closeModal();
          history.push('/account/orders');
        },
      }]
    });
  }

  render() {
    let { loading, list, wallet, query, lost } = this.state;
    let { price } = query;
    let { toast, modal } = this.props;
    return (
      <View className={style.home}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="收银台" />
        </Header>

        <Content>
          {!loading && list.length === 0 &&
            <div className="feedback">
              <div className="mark">
                <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
              </div>
              <h3 className="title">非常抱歉</h3>
              <div className="describe">您当前浏览器不支持支付<br />你可以使用微信或千丁APP访问</div>
              <div className="vspace hspace">
                <a className="button default" href="//dl.qdingnet.com">下载千丁小区</a>
              </div>
            </div>
          }
          {list.length > 0 &&
            <Aux>
              <div className="hspace text-sm" ui-mode="15px">
                <div className="vspace" ui-mode="10px">请选择支付方式</div>
              </div>
              {
                list.map((item, idx) => {
                  return (
                    <div key={ idx } className="list">
                      {/* 钱包支付:已经禁用 */}
                      {item.type === 61 && wallet.status == 0 &&
                        <label className="item disabled" ui-mode="15px">
                          <div className="avatar">
                            <img width="45" height="45" src={ item.icon } />
                          </div>
                          <span className="text">
                            <span className="text-darkgray">{ item.name }<span className="text-gray text-sm">（余额: { Filter.currency(item.value) }）</span></span>
                            <div className="brief text-ellipsis">
                              <span className="text-gray">{ wallet.statusTips || '提醒：钱包已被冻结，请联系客服' }</span>
                            </div>
                          </span>
                        </label>
                      }
                      {/* 钱包支付:正常使用 */}
                      {item.type === 61 && wallet.status == 1 &&
                        <label className="item tapable forlab" ui-mode="15px">
                          <div className="avatar">
                            <img width="45" height="45" src={ item.icon } />
                          </div>
                          <span className="text">
                            <span>{ item.name }<span className="text-driving text-sm">（余额: { Filter.currency(item.value) }）</span></span>
                            <div className="brief text-ellipsis">{ item.desc }</div>
                          </span>
                          <input className="checkbox" type="radio" name="paytype" checked={ item.defaultFlag } onChange={ this.handleChange.bind(this, item) } />
                        </label>
                      }
                      {/* 其他支付 */}
                      { item.type !== 61 &&
                        <label className="item tapable forlab" ui-mode="15px">
                          <div className="avatar">
                            <img width="45" height="45" src={ item.icon } />
                          </div>
                          <span className="text">
                            <span>{ item.name }</span>
                            <div className="brief text-ellipsis">{ item.desc }</div>
                          </span>
                          <input className="checkbox" type="radio" name="paytype" checked={ item.defaultFlag } onChange={ this.handleChange.bind(this, item) } />
                        </label>
                      }
                    </div>
                  );
                })
              }
            </Aux>
          }
        </Content>

        {list.length > 0 &&
          <Footer>
            <div className="button-group compact">
              <button className="button literal square text-left">应付: <span className="text-driving">{ Filter.currency(price) }</span></button>
              <button className="button driving square" disabled={ lost } onClick={ this.handlePayment }>立即支付</button>
            </div>
          </Footer>
        }

        <Widgets>
          <Modal {...modal} />
          <Toast {...toast} />
        </Widgets>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modules.cashier.home,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
