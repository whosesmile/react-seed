import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Swipe } from 'library';

class SwipeExample extends Component {

  render() {
    const listA = [
      '//img1.qdingnet.com/d1eddbc02a7f79d6bd7c10373ca514c1.jpg',
      '//img1.qdingnet.com/9ed0a211a26ee3bc5c11320ef672a132.jpg',
      '//img1.qdingnet.com/f9189c6eb1d500bf8201325c0952f12a.jpg',
      '//img1.qdingnet.com/8f4bc4e27f7fdf5676db7498a087b809.jpg',
      '//img1.qdingnet.com/4dc07abb5bb1eed9243a161d807a0df9.jpg',
    ];

    const listB = [{
      src: '//img1.qdingnet.com/128a736325ac814add62732a444329f5.webp',
      onClick: () => {},
    }, {
      src: '//img1.qdingnet.com/944eedb18012885e0273b0fe4e867492.webp',
      onClick: () => {},
    }, {
      src: '//img1.qdingnet.com/2b8bb47385d0f48ac222b0175d859a50.webp',
      onClick: () => {},
    }, {
      src: '//img1.qdingnet.com/ce960b9c4e4b7a2f90f5d60bff453c06.webp',
      onClick: () => {},
    }, {
      src: '//img1.qdingnet.com/26654e6f0313921a6095408f183501c7.webp',
      onClick: () => {},
    }];

    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Swipe" />
        </Header>

        <Content>
          <div className="divider">不循环</div>
          <Swipe list={listA} paddingTop="32.29%" />
          <div className="divider">循环</div>
          <Swipe list={listB} paddingTop="48%" loop />
        </Content>
      </View>
    );
  }

}

export default connect()(SwipeExample);
