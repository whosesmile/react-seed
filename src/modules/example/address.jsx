import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Address } from 'library';

class AddressExample extends Component {

  // 切换地址回调
  switchAddress = (address) => {
    this.setState({ address });
  }

  render() {
    let { address } = this.state || {};
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Address" />
        </Header>

        <Content>
          <div className="list">
            {/* 缺省值: lock=false auto=true addr=true*/}
            <Address className="item" lock={false} auto={true} addr={true} callback={this.switchAddress} />
          </div>

          {/*示范回调使用*/}
          {address &&
            <div className="list">
              <div className="item-divider">你选择了：</div>
              <div className="item" ui-mode="15px">
                <i className="icon text-xl text-darkgray">&#xe60d;</i>
                <div className="text">
                  <p className="text-justify text-md">
                    <span>{ address.name }</span>
                    <span className="value text-right">{ address.mobile }</span>
                  </p>
                  <p className="brief"><span>地址：{ address.addressStr || address }</span></p>
                </div>
                <i className="icon text-gray">&#xe61a;</i>
              </div>
            </div>
          }

          <div className="vspace hspace text-center text-darkgray text-md">
            <div className="divider">锁定社区</div>
            <p>有的业务需要限定地址所在社区：<br />lock:true</p>
            <p>此时无论是默认社区，还是所选社区，都会被限制为当前用户所处社区内</p>
          </div>

        </Content>
      </View>
    );
  }
}

export default connect()(AddressExample);
