import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/actionsheet';
import { View, Header, Title, Content, ActionSheet, Widgets } from 'library';

class ActionSheetExample extends Component {

  render() {
    let { openSheet, closeSheet } = this.props.actions;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="ActionSheet" />
        </Header>

        <Content>
          <div className="hspace vspace">
            <button className="button success" onClick={()=>openSheet('sheetA')}>标准菜单</button>
          </div>

          <div className="hspace vspace">
            <button className="button warning" onClick={()=>openSheet('sheetB')}>无标题菜单</button>
          </div>

          <div className="hspace vspace">
            <button className="button primary" onClick={()=>openSheet('sheetC')}>标题&amp;描述</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>如果希望点击遮罩关闭 设置 dismiss:fn</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-primary" onClick={()=>openSheet('sheetD')}>点击遮罩关闭</button>
          </div>
        </Content>

        <Widgets>
          <ActionSheet {...{
            show: this.props.sheetA,
            title: '请选择',
            buttons: [[{
              text: 'Apple Pay',
              className: 'text-driving',
              onClick: ()=>closeSheet('sheetA'),
            }, {
              text: '支付宝',
              className: 'text-primary',
              onClick: ()=>closeSheet('sheetA'),
            }, {
              text: '微信支付',
              className: 'text-success',
              onClick: ()=>closeSheet('sheetA'),
            }],[{
              text: '取消',
              className: 'text-gray',
              onClick: ()=>closeSheet('sheetA'),
            }]],
          }} />

          <ActionSheet {...{
            show: this.props.sheetB,
            buttons: [[{
              text: 'Apple Pay',
              className: 'text-driving',
              onClick: ()=>closeSheet('sheetB'),
            }, {
              text: '支付宝',
              className: 'text-primary',
              onClick: ()=>closeSheet('sheetB'),
            }, {
              text: '微信支付',
              className: 'text-success',
              onClick: ()=>closeSheet('sheetB'),
            }],[{
              text: '取消',
              className: 'text-gray',
              onClick: ()=>closeSheet('sheetB'),
            }]],
          }} />

          <ActionSheet {...{
            show: this.props.sheetC,
            title: '请选择',
            message: <div className="text-darkgray">推荐使用支付宝</div>,
            buttons: [[{
              text: 'Apple Pay',
              className: 'text-driving',
              onClick: ()=>closeSheet('sheetC'),
            }, {
              text: '支付宝',
              className: 'text-primary',
              onClick: ()=>closeSheet('sheetC'),
            }, {
              text: '微信支付',
              className: 'text-success',
              onClick: ()=>closeSheet('sheetC'),
            }],[{
              text: '取消',
              className: 'text-gray',
              onClick: ()=>closeSheet('sheetC'),
            }]],
          }} />

          <ActionSheet {...{
            show: this.props.sheetD,
            title: '点击遮罩会关闭',
            dismiss: ()=>closeSheet('sheetD'),
            buttons: [[{
              text: 'Apple Pay',
              className: 'text-driving',
              onClick: ()=>closeSheet('sheetD'),
            }, {
              text: '支付宝',
              className: 'text-primary',
              onClick: ()=>closeSheet('sheetD'),
            }, {
              text: '微信支付',
              className: 'text-success',
              onClick: ()=>closeSheet('sheetD'),
            }],[{
              text: '取消',
              className: 'text-gray',
              onClick: ()=>closeSheet('sheetD'),
            }]],
          }} />
        </Widgets>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.actionsheet;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionSheetExample);
