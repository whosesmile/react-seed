import React, { Component } from 'react';
import BLink from './blink';

class TabBar extends Component {

  render() {
    const { type } = this.props;
    return (
      <div className="tabbar">
        <BLink className="item" to="/">
          {type !== 'home' && <i className="icon"><img src="//img1.qdingnet.com/271070ebd237e8b16422f0d32cdf5de3.png" /></i>}
          {type === 'home' && <i className="icon"><img src="//img1.qdingnet.com/bf358a4bd55d9713602e22a7050cedd5.png" /></i>}
        </BLink>
        <BLink className="item" to="/assistant">
          {type !== 'services' && <i className="icon"><img src="//img1.qdingnet.com/af3c3f5cde9735d227285083053cd77b.png" /></i>}
          {type === 'services' && <i className="icon"><img src="//img1.qdingnet.com/4853b494fa6f605cac193247aeb000f3.png" /></i>}
        </BLink>
        <BLink className="item" to="/shopping">
          {type !== 'shopping' && <i className="icon"><img src="//img1.qdingnet.com/315de08c6981e500f8a440b923c58d14.png" /></i>}
          {type === 'shopping' && <i className="icon"><img src="//img1.qdingnet.com/ae3e7b9f68d9b774f429526e01edc3de.png" /></i>}
        </BLink>
        <BLink className="item" to="/account">
          {type !== 'account' && <i className="icon"><img src="//img1.qdingnet.com/9b844287c34d6313d99f7f5eccb60134.png" /></i>}
          {type === 'account' && <i className="icon"><img src="//img1.qdingnet.com/1d03c2eb847c041d951ffbb3b57fdb35.png" /></i>}
        </BLink>
      </div>
    );
  }
}

export default TabBar;
