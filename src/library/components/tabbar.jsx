import React, { Component } from 'react';
import BLink from './blink';

class TabBar extends Component {

  render() {
    const { type } = this.props;
    return (
      <div className="tabbar">
        <BLink className="item" to="/">
          {type !== 'home' && <img className="icon" src="//img1.qdingnet.com/dbd920ed0d12e74689c9786f759ada1e.png" />}
          {type === 'home' && <img className="icon" src="//img1.qdingnet.com/636f41b357f7f6fe51629db35e1c3d56.png" />}
          <span className="label">首页</span>
        </BLink>
        <BLink className="item" to="/services">
          {type !== 'services' && <img className="icon" src="//img1.qdingnet.com/7222385850343a42d3453f9d096d798f.png" />}
          {type === 'services' && <img className="icon" src="//img1.qdingnet.com/413c532f74f25358711d08ad75e6b2f5.png" />}
          <span className="label">服务</span>
        </BLink>
        <BLink className="item" to="/shopping">
          {type !== 'shopping' && <img className="icon" src="//img1.qdingnet.com/9c1de5216c64b99bd8b7ed826654f3c9.png" />}
          {type === 'shopping' && <img className="icon" src="//img1.qdingnet.com/c09b5a2242284d40286faef692f56414.png" />}
          <span className="label">邻聚</span>
        </BLink>
        <BLink className="item" to="/account">
          {type !== 'account' && <img className="icon" src="//img1.qdingnet.com/0abe3878489954088a2ab8f4e7ca664a.png" />}
          {type === 'account' && <img className="icon" src="//img1.qdingnet.com/80ead8f7dbed6fb3b5a70f51ca586877.png" />}
          <span className="label">我的</span>
        </BLink>
      </div>
    );
  }
}

export default TabBar;
