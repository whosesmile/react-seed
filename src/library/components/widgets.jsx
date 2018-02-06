/**
 * 插槽
 */
import React, { Component } from 'react';

class Widgets extends Component {

  render() {
    return (
      <div className="widgets">
        { this.props.children }
      </div>
    );
  }
}
export default Widgets;
