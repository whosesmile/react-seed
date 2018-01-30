import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/addresses';
import { setAddress } from '../../redux';
import { View, Header, Footer, Title, Content, BLink, Widgets, Toast, Modal, ActionSheet } from 'library';

// 地址列表
class Addresses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 待删除的地址
      address: null,
    };
  }

  componentDidMount() {
    let { list, actions } = this.props;
    if (list.length === 0) {
      actions.fetchAddress();
    }
  }

  // 有效地址(部分业态会限制特定社区)
  filterValid() {
    let { params } = this.props.match;
    let { list = [], project } = this.props;

    return params.lock ? list.filter(item => item.projectId == project.id) : list;
  }

  // 无效地址(部分业态会限制特定社区)
  filterInValid() {
    let { params } = this.props.match;
    let { list = [], project } = this.props;

    return params.lock ? list.filter(item => item.projectId != project.id) : [];
  }

  handleDefault(address) {
    this.props.actions.setDefault(address);
  }

  promptDelete(address) {
    this.setState({
      showA: true,
      address: address,
    });
  }

  promptRestrict = (address) => {
    this.setState({
      showB: true,
      address: address,
    });
  }

  cancelPrompt(type) {
    this.setState({
      [type]: false,
    });
  }

  confirmDelete() {
    this.props.actions.deleteAddress(this.state.address);
    this.cancelPrompt('showA');
  }

  handleClick(address, event) {
    let { project } = this.props;
    let { params } = this.props.match;

    // 选择地址
    if (params.choose) {
      event.preventDefault();

      // 无效地址 不要用 !== 接口不规范 数据类型不一致
      if (params.lock && project.id != address.projectId) {
        return this.promptRestrict(address);
      }
      // 触发全局地址改变
      this.props.chooseAddress(address);
      return history.back();
    }
  }

  renderAddress(item) {
    return (
      <div key={item.id} className="list">
        <BLink className="item" ui-mode="15px" to={`/account/address/${item.id}`} onClick={this.handleClick.bind(this, item)}>
          <i className="icon text-xl text-darkgray">&#xe60d;</i>
          <div className="text">
            <p className="text-justify text-md">
              <span>{ item.name }</span>
              <span className="value text-right">{ item.mobile }</span>
            </p>
            <div className="brief text-ellipsis">{ item.addressStr }</div>
          </div>
          <i className="icon">&#xe61a;</i>
        </BLink>
        <div className="item">
          <label className="text text-sm text-darkgray">
            <input className="checkbox" type="radio" name="radio" checked={ item.defaultFlag } onChange={this.handleDefault.bind(this, item)} />
            <span>设为默认</span>
          </label>
          <div className="extra">
            <div className="button-group">
              <BLink className="button default sm" to={`/account/address/${item.id}`}><i className="icon">&#xe627;</i>编辑</BLink>
              <a className="button default sm" disabled={ item.defaultFlag } onClick={this.promptDelete.bind(this, item)}><i className="icon">&#xe629;</i>删除</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { params } = this.props.match;
    let { toast, list, loading, project } = this.props;

    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title={params.choose ? '选择地址' : '收货地址'} />
        </Header>

        <Content>
          {!loading && list.length === 0 &&
            <div className="feedback">
              <div className="mark">
                <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
              </div>
              <div className="describe">还没有地址，去添加一个吧！</div>
              <div className="vspace hspace">
                <BLink className="button driving" to="/account/address">新增地址</BLink>
              </div>
            </div>
          }
          {this.filterValid().map(item => this.renderAddress(item))}
          {this.filterInValid().length > 0 &&
            <div className="divider text-gray" ui-mode="20%">以下地址不在服务范围内</div>
          }
          {this.filterInValid().map(item => this.renderAddress(item))}
        </Content>

        {list.length > 0 &&
          <Footer>
            <BLink className="button driving square" to="/account/address"><i className="icon">&#xe62c;</i>新增地址</BLink>
          </Footer>
        }

        <Widgets>
          {/* 通用TOAST */}
          <Toast {...toast} />

          <ActionSheet {...{
            show: this.state.showA,
            message: '您确认要删除这条记录吗？',
            dismiss: ()=>this.cancelPrompt('showA'),
            buttons: [[{
              text: '删除',
              className: 'text-warning',
              onClick: ()=>this.confirmDelete(),
            }],[{
              text: '取消',
              onClick: ()=>this.cancelPrompt('showA'),
            }]],
          }} />

          <Modal {...{
            show: this.state.showB,
            title: '温馨提示',
            message: <div>当前服务仅在 <span className="text-driving">{ project.cityName }{ project.name }</span> 提供支持，请重选或编辑当前地址</div>,
            dismiss: ()=>this.cancelPrompt('showB'),
            buttons: [{
              text: '重选',
              onClick: ()=>this.cancelPrompt('showB'),
            },{
              text: '编辑',
              onClick: ()=>{
                this.cancelPrompt('showB');
                let { address } = this.state;
                let { history } = this.props;
                history.push(`/account/address/${address.id}`);
              },
            }],
          }} />
        </Widgets>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modules.account.addresses,
  project: state.project,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  chooseAddress: (address) => dispatch(setAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);
