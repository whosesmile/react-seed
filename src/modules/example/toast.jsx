import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/toast';
import { View, Header, Title, Content, Toast, Widgets } from 'library';

class ToastExample extends Component {

  toastA() {
    this.props.actions.openToast({
      icon: '&#xe677;',
      message: '模态吐司',
      modal: true,
    });
  }

  toastB() {
    this.props.actions.openToast({
      icon: 'loading',
    });
  }

  toastC() {
    this.props.actions.openToast({
      icon: 'success',
      message: '操作成功',
    });
  }

  toastD() {
    this.props.actions.openToast({
      icon: 'failure',
      message: '操作失败',
    });
  }

  toastE() {
    this.props.actions.openToast({
      icon: 'warning',
      message: '警告提示',
    });
  }

  toastF() {
    this.props.actions.openToast({
      icon: '&#xe60d;',
      message: '任意文案',
    });
  }

  render() {
    let { toast } = this.props;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Toast" />
        </Header>

        <Content>
          <div className="text-gray text-center vspace hspace text-sm">
            <p>默认Toast是模态的 以便向下兼容(遮盖交互)</p>
            <p>可以手动设置参数 modal: false来获得非模态的Toast</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-primary" onClick={()=>this.toastA()}>模态吐司</button>
          </div>

          <div className="hspace vspace">
            <button className="button success" onClick={()=>this.toastB()}>加载提示</button>
          </div>

          <div className="hspace vspace">
            <button className="button warning" onClick={()=>this.toastC()}>操作成功</button>
          </div>

          <div className="hspace vspace">
            <button className="button primary" onClick={()=>this.toastD()}>操作失败</button>
          </div>

          <div className="hspace vspace">
            <button className="button driving" onClick={()=>this.toastE()}>警告提示</button>
          </div>

          <div className="hspace vspace">
            <button className="button default" onClick={()=>this.toastF()}>任意组合</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>特别说明:</p>
            <p>axios在发送请求时会自动触发一个Toast Loading</p>
            <p>如果希望关闭这个提醒，需axios请求时配置参数:</p>
            <p className="text-warning">global:false</p>
          </div>

        </Content>

        <Widgets>
          <Toast {...toast} />
        </Widgets>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.toast;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastExample);
