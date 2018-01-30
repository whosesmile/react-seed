import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, BLink, LazyImg } from 'library';

class ImageExample extends Component {

  render() {
    let { list } = this.props;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="LazyImg" />
        </Header>

        <Content>
          <div className="list compact">
            {
              list.map((item, idx) => {
                return (
                  <BLink key={idx} className="item" to="/">
                    <div className="avatar">
                      <LazyImg width="60" src={`http://lorempixel.com/60/60/?t=${idx}`} />
                    </div>
                    <div className="text">
                      <h4>善在·金鼎轩</h4>
                      <div className="brief">菜式很齐全，味道也不错，环境很温馨，并且不用排队，完美。</div>
                    </div>
                  </BLink>
                );
              })
            }
          </div>
        </Content>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.image;
export default connect(mapStateToProps)(ImageExample);
