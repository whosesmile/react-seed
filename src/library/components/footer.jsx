import React, { Component } from 'react';
import classnames from 'classnames';

class Footer extends Component {

  render() {
    const { className, children, ...others } = this.props;
    return (
      <footer className={classnames('bar', className)} {...others}>
        {children}
      </footer>
    );
  }
}

export default Footer;
