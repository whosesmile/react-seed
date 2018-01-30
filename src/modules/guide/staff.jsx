import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content } from 'library';
import { JSBridge } from 'library/util';

class Staff extends Component {

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="我的客服" />
        </Header>

        <Content>
          <div className="list compact">
            <div className="item-divider">
              <span>请选择客服形式：</span>
            </div>
            <div className="item thread tapable" ui-mode="15px" onClick={()=>JSBridge.meiqia()}>
              <div className="avatar">
                <img width="30" height="30" src="//img1.qdingnet.com/9da224d423469211aca5516cedafc143.png" />
              </div>
              <div className="text">
                <span className="text-md">在线客服</span>
                <div className="brief">由人工为您提供在线客服</div>
              </div>
              <i className="icon text-gray">&#xe61a;</i>
            </div>
            <a className="item thread" ui-mode="15px" href="tel:4007350350">
              <div className="avatar">
                <img width="30" height="30" src="//img1.qdingnet.com/021009edeb94589eb1844fc9bff607d8.png" />
              </div>
              <div className="text">
                <span className="text-md">电话客服</span>
                <div className="brief">拨打4007350350客服热线</div>
              </div>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
          </div>
        </Content>
      </View>
    );
  }

}

export default connect()(Staff);
