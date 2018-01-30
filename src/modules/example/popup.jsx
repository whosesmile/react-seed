import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/popup';
import { View, Header, Title, Content, Popup, PopupHeader, Widgets } from 'library';

class PopupExample extends Component {

  render() {
    let { openPopup, closePopup } = this.props.actions;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Popup" />
        </Header>

        <Content>
          <div className="hspace vspace">
            <button className="button primary" onClick={()=>openPopup('popupA')}>标准浮窗</button>
          </div>

          <div className="hspace vspace">
            <button className="button driving" onClick={()=>openPopup('popupB')}>自定义按钮&amp;无标题</button>
          </div>

          <div className="hspace vspace">
            <button className="button success" onClick={()=>openPopup('popupC')}>限制内容高度滚动</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>如果希望点击遮罩关闭 设置 dismiss:fn</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-primary" onClick={()=>openPopup('popupD')}>点击遮罩关闭</button>
          </div>
        </Content>

        <Widgets>
          <Popup show={this.props.popupA}>
            <PopupHeader {...{
              title: '我是浮窗',
              onCancel:()=>closePopup('popupA'),
              onConfirm:()=>closePopup('popupA'),
            }} />
            <div className="list compact">
              {Array(5).fill(1).map((item, idx) => (
                <label key={idx} className="item tapable">
                  <input className="checkbox success" type="radio" name="radio" />
                  <div className="text">一个选项</div>
                </label>
              ))}
            </div>
          </Popup>

          <Popup show={this.props.popupB}>
            <PopupHeader {...{
              labels: {cancel: '放弃', confirm: '保存'},
              onCancel:()=>closePopup('popupB'),
              onConfirm:()=>closePopup('popupB'),
            }} />
            <div className="list compact">
              {Array(5).fill(1).map((item, idx) => (
                <label key={idx} className="item tapable">
                  <input className="checkbox success" type="radio" name="radio" />
                  <div className="text">一个选项</div>
                </label>
              ))}
            </div>
          </Popup>

          <Popup show={this.props.popupC}>
            <PopupHeader {...{
              title: '限制高度',
              onCancel:()=>closePopup('popupC'),
              onConfirm:()=>closePopup('popupC'),
            }} />
            <div className="content">
              <div className="list compact">
                {Array(100).fill(1).map((item, idx) => (
                  <label key={idx} className="item tapable">
                    <input className="checkbox success" type="radio" name="radio" />
                    <div className="text">一个选项</div>
                  </label>
                ))}
              </div>
            </div>
          </Popup>

          <Popup show={this.props.popupD} dismiss={()=>closePopup('popupD')}>
            <div className="list compact">
              {Array(5).fill(1).map((item, idx) => (
                <div key={idx} className="item" onClick={()=>closePopup('popupD')}>
                  <div className="text">北京欢迎你</div>
                  <i className="icon">&#xe61a;</i>
                </div>
              ))}
            </div>
          </Popup>
        </Widgets>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.popup;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupExample);
