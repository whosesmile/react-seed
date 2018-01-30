import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Swing } from 'library';

class SwingExample extends Component {

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Swing" />
        </Header>

        <Content coord>
          <Swing className="shadow">
            <div className="flex text-center">
              <span className="item vspace">可口可乐</span>
              <span className="item vspace">百事可乐</span>
              <span className="item vspace">健怡可乐</span>
            </div>
          </Swing>
          <div className="list compact">
            {
              Array(15).fill(1).map((item, idx) => <div key={idx} className="item">心有猛虎</div>)
            }
          </div>

          <Swing>
            <div className="flex text-center">
              <span className="item vspace">柠檬雪碧</span>
              <span className="item vspace">樱桃雪碧</span>
              <span className="item vspace">七喜雪碧</span>
            </div>
          </Swing>

          <div className="list compact">
            {
              Array(15).fill(1).map((item, idx) => <div key={idx} className="item">细嗅蔷薇</div>)
            }
          </div>
        </Content>
      </View>
    );
  }
}

export default connect()(SwingExample);
