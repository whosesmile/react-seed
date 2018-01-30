import React, { Component } from 'react';

class Bundle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({ mod: null });
    props.load(mod => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    // children 必须是一个方法
    // 由于动画的原因，这类没有按官方文档来，必须包一层，样式已经处理过了
    return <div className="bundle">{this.state.mod ? this.props.children(this.state.mod) : null}</div>;
  }
}

export default Bundle;
