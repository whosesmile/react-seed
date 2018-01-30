import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Aux } from 'library';
import { bindActionCreators } from 'redux';
import { actions } from './ducks/parcel';

class Parcel extends Component {

  componentDidMount() {
    const { parcel, match, actions } = this.props;
    if (!parcel) {
      actions.fetchParcel(match.params.id);
    }
  }

  render() {
    const { parcel } = this.props;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="包裹详情" />
        </Header>

        <Content>
          {parcel &&
            <Aux>
              <div className="list compact overlap">
                <div className="item addrbar" ui-mode="15px">
                  <i className="icon text-xl text-darkgray">&#xe60d;</i>
                  <div className="text">
                    <p className="text-justify text-md">
                      <span>{parcel.recipientsName}</span>
                      <span className="value text-right">{parcel.recipientsMobile}</span>
                    </p>
                    <p className="brief"><span>地址：{parcel.address}</span></p>
                  </div>
                </div>
              </div>

              <div className="list text-md">
                <div className="item">
                  <div className="text">房屋信息:</div>
                </div>
                {
                  parcel.roomNames.map((item, idx) => (
                    <div key={idx} className="item">
                      <div className="text">{item}</div>
                    </div>
                  ))
                }
              </div>
            </Aux>
          }
        </Content>
      </View>
    );
  }
}

const mapStateToProps = state => state.modules.guide.parcel;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Parcel);
