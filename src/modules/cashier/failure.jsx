import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content } from 'library';
import { JSBridge } from 'library/util';

class Failure extends Component {

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="支付失败" />
        </Header>

        <Content>
          <div className="feedback compact">
            <div className="mark">
              <i className="icon text-warning">&#xe6a0;</i>
            </div>
            <h3 className="title">支付失败</h3>
            <p className="describe">
              非常抱歉，您可以返回订单尝试重新发起支付<br />
              您也可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询
            </p>

            <div className="vspace hspace">
              <button className="button plain-warning" onClick={() => this.props.history.go(-1)}>重新支付</button>
              <button className="button default" onClick={()=> JSBridge.orders()}>查看订单</button>
            </div>
          </div>
        </Content>
      </View>
    );
  }
}

export default connect()(Failure);
