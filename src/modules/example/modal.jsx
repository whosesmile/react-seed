import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/modal';
import { View, Header, Title, Content, Modal, Widgets } from 'library';

class ModalExample extends Component {

  modalA() {
    let { actions } = this.props;
    actions.openModal({
      title: '我是标题',
      message: '这里是提示文案，啦啦啦你好呀',
      buttons: [{
        text: '取消',
        onClick: () => actions.closeModal(),
      }, {
        text: '确定',
        onClick: () => actions.closeModal(),
      }],
    });
  }

  modalB() {
    let { actions } = this.props;
    actions.openModal({
      title: '我是标题',
      message: '这里是提示文案，啦啦啦你好呀',
      buttons: [{
        text: '确定',
        onClick: () => actions.closeModal(),
      }],
    });
  }

  modalC() {
    let { actions } = this.props;
    actions.openModal({
      message: '这里是提示文案，啦啦啦你好呀',
      buttons: [{
        text: '确定',
        onClick: () => actions.closeModal(),
      }],
    });
  }

  modalD() {
    let { actions } = this.props;
    actions.openModal({
      title: '填写表单',
      message: (
        <div className="list">
          <label className="item">
            <span className="label">手机号</span>
            <div className="text">
              <input className="input" type="tel" pattern="[0-9]*" placeholder="请输入您的电话" />
            </div>
          </label>
          <label className="item">
            <span className="label">验证码</span>
            <div className="text">
              <input className="input" type="text" placeholder="请输入验证码" />
            </div>
          </label>
        </div>
      ),
      buttons: [{
        text: '取消',
        onClick: () => actions.closeModal(),
      }, {
        text: '确定',
        onClick: () => actions.closeModal(),
      }],
    });
  }

  modalE() {
    let { actions } = this.props;
    actions.openModal({
      title: '点击遮罩会关闭',
      message: '这里是提示文案，啦啦啦你好呀',
      dismiss: () => actions.closeModal(),
      buttons: [{
        text: '取消',
        onClick: () => actions.closeModal(),
      }, {
        text: '确定',
        onClick: () => actions.closeModal(),
      }],
    });
  }

  render() {
    let { modal } = this.props;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Modal" />
        </Header>

        <Content>
          <div className="hspace vspace">
            <button className="button success" onClick={()=>this.modalA()}>标准弹窗</button>
          </div>

          <div className="hspace vspace">
            <button className="button warning" onClick={()=>this.modalB()}>单按钮弹窗</button>
          </div>

          <div className="hspace vspace">
            <button className="button primary" onClick={()=>this.modalC()}>无标题弹窗</button>
          </div>

          <div className="hspace vspace">
            <button className="button driving" onClick={()=>this.modalD()}>复合弹窗</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>如果希望点击遮罩关闭 设置 dismiss:fn</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-primary" onClick={()=>this.modalE()}>点击遮罩关闭</button>
          </div>
        </Content>

        <Widgets>
          <Modal {...modal} />
        </Widgets>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.modal;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);
