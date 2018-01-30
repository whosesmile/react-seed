import React, { Component } from 'react';

class Layout extends Component {

  render() {
    let { children, background } = this.props;

    return (
      <section id="app" style={{background}}>
        {children}
        {/*
        <widgets />
        <views>
          <menubar />
          <view>
            <tabs>
              <tab>
                {children}
              </tab>
            </tabs>
          </view>
        </views>
        */}
      </section>
    );
  }
}

export default Layout;
