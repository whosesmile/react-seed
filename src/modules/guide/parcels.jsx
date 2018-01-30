import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, BLink } from 'library';
import { bindActionCreators } from 'redux';
import { actions } from './ducks/parcels';

class Parcels extends Component {

  componentDidMount() {
    const { list, actions } = this.props;
    if (list.length === 0) {
      actions.fetchParcels();
    }
  }

  render() {
    const { loading, list } = this.props;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="入住通知包裹查询" />
        </Header>

        <Content>
          {!loading && list.length === 0 &&
            <div className="feedback">
              <div className="mark">
                <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
              </div>
              <div className="describe">抱歉，您当前暂无可查询的快递包裹</div>
            </div>
          }

          {list.map(item=> (
            <div key={item.id} className="list">
              <BLink className="item" ui-mode="15px" to={{pathname:`/guide/express/${item.packageNumber}`, query:{company: item.packageName}}}>
                <div className="avatar">
                  <img width="64px" height="64px" src="//img1.qdingnet.com/34164f7866382dc9a92eb729fcdc8387.png" />
                </div>
                <div className="text text-md">
                  <div>快递公司: {item.packageName}</div>
                  <div>快递单号: {item.packageNumber}</div>
                </div>
              </BLink>
              <div className="item">
                <div className="text" />
                <div className="extra">
                  <div className="button-group">
                    <BLink className="button default sm" to={`/guide/parcel/${item.id}`}>包裹详情</BLink>
                    <BLink className="button default sm" to={{pathname:`/guide/express/${item.packageNumber}`, query:{company: item.packageName}}}>物流详情</BLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Content>
      </View>
    );
  }
}

const mapStateToProps = state => state.modules.guide.parcels;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Parcels);
