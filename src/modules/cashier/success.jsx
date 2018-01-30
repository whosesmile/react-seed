import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content } from 'library';
import { JSBridge } from 'library/util';

class Success extends Component {

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="支付成功" />
        </Header>

        <Content>
          <div className="feedback compact">
            <div className="mark">
              <i className="icon text-success">&#xe696;</i>
            </div>
            <h3 className="title">支付成功</h3>
            <div className="describe">如有疑问，您可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>

            <div className="vspace hspace">
              <button className="button plain-success" onClick={()=> JSBridge.orders()}>查看订单</button>
            </div>
          </div>
        </Content>
      </View>
    );
  }
}

export default connect()(Success);
