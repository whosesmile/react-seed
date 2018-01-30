import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, BLink } from 'library';

class Home extends Component {

  render() {
    return (
      <View className="home">
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="组件使用范例" />
        </Header>

        <Content>
          <div className="list">
            <div className="item-divider">
              交互组件:
            </div>
            <BLink className="item" to="/example/toast">
              <div className="text">吐司</div>
              <div className="extral">Toast</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/modal">
              <div className="text">弹窗</div>
              <div className="extral">Modal</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/popup">
              <div className="text">浮层</div>
              <div className="extral">Popup</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/picker">
              <div className="text">选择器</div>
              <div className="extral">Picker</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/actionsheet">
              <div className="text">弹出式菜单</div>
              <div className="extral">ActionSheet</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <div className="item-divider">
              容器组件:
            </div>
            <BLink className="item" to="/example/loader">
              <div className="text">自动加载</div>
              <div className="extral">Loader</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/image">
              <div className="text">延迟图片</div>
              <div className="extral">LazyImg</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/input">
              <div className="text">输入控件</div>
              <div className="extral">Input</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/swing">
              <div className="text">自动悬挂</div>
              <div className="extral">Swing</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <div className="item-divider">
              复合组件:
            </div>
            <BLink className="item" to="/example/district">
              <div className="text">省市区选择</div>
              <div className="extral">District</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/coupon">
              <div className="text">选择千丁券</div>
              <div className="extral">Coupon</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/address">
              <div className="text">选择地址</div>
              <div className="extral">Address</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/example/swipe">
              <div className="text">旋转木马</div>
              <div className="extral">Swipe</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
          </div>
        </Content>
      </View>
    );
  }

}

export default connect()(Home);
