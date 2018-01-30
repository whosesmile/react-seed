import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Input } from 'library';

class InputExample extends Component {

  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  handleChange = (e) => {
    /* eslint-disable no-console */
    console.log('input当前值为:', e.target.value);
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Input" />
        </Header>

        <Content>
          <div className="list compact">
            <div className="item">
              <Input name="text" placeholder="试试输入文字" value={this.state.input } onChange={this.handleChange} />
            </div>
          </div>
        </Content>
      </View>
    );
  }
}

export default connect()(InputExample);
