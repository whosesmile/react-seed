import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content } from 'library';

class NoMatch extends Component {

  handleReload() {
    location.reload();
  }

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="页面未找到" />
        </Header>
        <Content>
          <div className="feedback">
            <div className="mark">
              <img width="197" height="98" src="//img1.qdingnet.com/a93623660fa443e00a6a2fbbf3578635.png" alt="空白" />
            </div>
            <h3 className="title">Oops!</h3>
            <div className="describe">服务器走进了黑森林，没有找到出口...</div>
          </div>

          <div className="vspace hspace">
            <a className="button default" onClick={this.handleReload}>重新加载</a>
          </div>
        </Content>
      </View>
    );
  }

}
export default connect()(NoMatch);
