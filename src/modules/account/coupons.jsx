import style from './style.less';
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Footer, BLink, Loader, Widgets, Modal, Toast } from 'library';
import { Filter } from 'library/util';
import { actions } from './ducks/coupons';

class Coupons extends Component {

  state = {
    code: '',
    show: false,
  };

  loaderCallback = (list) => {
    this.props.actions.fetched(list);
  }

  queryParams() {
    switch (this.props.tabIndex) {
      case 1:
        return { status: 2 };
      case 2:
        return { status: 1 };
      case 3:
        return { status: 3 };
    }
  }

  handleChange = (e) => {
    this.setState({
      code: e.target.value,
    });
  }

  sendRequest = () => {
    const { code } = this.state;
    const { actions } = this.props;
    if (code.length === 0) {
      return actions.openToast({
        icon: 'failure',
        message: '请输入券编号',
      });
    }

    this.setState({
      code: '',
      show: false,
    });
    axios.post('/account/ajax/coupon', { code: code }).then(() => {
      actions.openToast({
        icon: 'success',
        message: '添加成功',
      });
      this.loader.refresh();
    });
  }

  render() {
    const STATUS = { 1: '未使用', 2: '已使用', 3: '已过期', 4: '已作废', 5: '未生效', 6: '已锁定' };
    const { tabIndex, list, actions, toast } = this.props;
    return (
      <View className={style.coupons}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="消息中心" />
        </Header>

        <Content>
          <div className="navbar underline driving overlap">
            <a className={classnames('item', {active: tabIndex === 1})} onClick={()=>actions.activeTab(1)}>未使用</a>
            <a className={classnames('item', {active: tabIndex === 2})} onClick={()=>actions.activeTab(2)}>已使用</a>
            <a className={classnames('item', {active: tabIndex === 3})} onClick={()=>actions.activeTab(3)}>已过期</a>
          </div>
          <Loader ref={loader=>this.loader=loader} url="/account/ajax/coupons" query={this.queryParams()} list={list} callback={this.loaderCallback}>
            { list.map(item => (
              <BLink key={item.code} className="list" to={`/account/coupon/${item.code}`}>
                <div className="item" ui-mode="15px">
                  <span className="price text-driving">￥<i>{item.price}</i></span>
                  <div className="text text-dark">
                    <span className="text-sm">{item.productNoNames}</span>
                    <p className="brief">
                      {Filter.date(item.startTime, 'yyyy-MM-dd')} 至 {Filter.date(item.endTime, 'yyyy-MM-dd')}
                    </p>
                  </div>
                  {item.status !== 1&&
                    <div className="status">{STATUS[item.status] || '已禁用'}</div>
                  }
                </div>
              </BLink>
            )) }
          </Loader>
        </Content>
        <Footer>
          <div className="button-group compact">
            <BLink className="button literal square text-dark" to="/account/coupon/protocol">使用说明</BLink>
            <button className="button driving square" onClick={()=>this.setState({show:true})}>添加千丁券</button>
          </div>
        </Footer>

        <Widgets>
          <Modal {...{
            show: this.state.show,
            title: '添加千丁券',
            message: (
              <div className="list compact form">
                <label className="item">
                  <span className="label text-right" ui-mode="48px">编号</span>
                  <div className="text">
                    <input className="input" placeholder="请输入您的券编号" maxLength="50" value={this.state.code} onChange={this.handleChange} />
                  </div>
                </label>
              </div>
            ),
            buttons: [{
              text: '取消',
              onClick: ()=>this.setState({show: false}),
            }, {
              text: '确定',
              onClick: this.sendRequest,
            }]
          }} />

          <Toast {...toast} />
        </Widgets>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modules.account.coupons,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
