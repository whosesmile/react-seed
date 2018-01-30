import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/loader';
import { View, Header, Title, Content, Loader } from 'library';

class LoaderExample extends Component {

  // 常规情形下你应当不需要关心list之外的数据结构
  // 但是如果后台返回的数据中包含其他你需要的数据
  // 你可以通过data来获取它
  callback = (list, data) => {
    this.props.actions.received(list, data);
  }

  render() {
    let { list } = this.props;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Loader" />
        </Header>

        <Content>
          <Loader url="/home/ajax/list" list={list} callback={this.callback}>
            <div className="list compact">
              {
                list.map((item, idx) => {
                  return (
                    <div key={idx} className="item">{idx + 1}</div>
                  );
                })
              }
            </div>
          </Loader>
        </Content>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.loader;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoaderExample);
