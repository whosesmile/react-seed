import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, BLink } from 'library';

class Home extends Component {

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="入住指南" />
        </Header>

        <Content>
          <div className="list compact overlap">
            <BLink className="item" to="/guide/staff">
              <div className="text">我的客服</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/guide/parcels">
              <div className="text">我的包裹</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
            <BLink className="item" to="/guide/records">
              <div className="text">评价服务</div>
              <i className="icon">&#xe61a;</i>
            </BLink>
          </div>
        </Content>
      </View>
    );
  }

}

export default connect()(Home);
