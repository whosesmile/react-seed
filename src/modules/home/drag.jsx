import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, BLink } from 'library';

class Drag extends Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount() {
    window.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      this.setState({
        s_pageX: touch.pageX,
        s_clientX: touch.clientX,
        s_screenX: touch.screenX,
      });
    });

    window.addEventListener('touchmove', e => {
      const touch = e.touches[0];
      this.setState({
        m_pageX: touch.pageX,
        m_clientX: touch.clientX,
        m_screenX: touch.screenX,
      });
    });

    window.addEventListener('touchend', e => {
      this.setState({ time: Date.now() });
    });

    window.addEventListener('touchcancel', e => {
      this.setState({ time: Date.now() });
    });
  }

  componentWillUnMount() {}

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="WK拖拽监控" />
        </Header>
        <Content>
          <div className="list">
            <BLink className="item" to="/example">
              <span className="text">组件使用范例</span>
              <span className="extra">异步载入子模块</span>
              <i className="icon text-gray">&#xe61a;</i>
            </BLink>
          </div>
          <div className="list">
            <div className="item-divider">开始点</div>
            <div className="item">
              <div className="text">pageX: {this.state.s_pageX}</div>
              <div className="text">clientX: {this.state.s_clientX}</div>
              <div className="text">screenX: {this.state.s_screenX}</div>
            </div>
            <div className="item-divider">移动点</div>
            <div className="item">
              <div className="text">pageX: {this.state.m_pageX}</div>
              <div className="text">clientX: {this.state.m_clientX}</div>
              <div className="text">screenX: {this.state.m_screenX}</div>
            </div>
            <div className="item-divider">比例尺</div>
            <div className="item">
              <div className="text">{this.state.m_pageX / screen.availWidth}</div>
            </div>
          </div>
        </Content>
      </View>
    );
  }

}

export default connect()(Drag);
