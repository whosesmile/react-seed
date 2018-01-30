import style from './style.less';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Aux } from 'library';
import { bindActionCreators } from 'redux';
import { actions } from './ducks/records';

class Records extends Component {

  componentDidMount() {
    const { list, actions } = this.props;
    if (list.length === 0) {
      actions.fetchRecords();
    }
  }

  filterList(type) {
    const { list } = this.props;
    return list.filter(item => item.bodyType == type);
  }

  handleClick(item) {
    const { history } = this.props;
    // 尚未评价
    if (item.status === 0) {
      history.push(`/guide/comment/${item.bodyId}/${item.bodyType}`);
    }
    // 已经评价
    else {
      history.push(`/guide/review/${item.bodyId}`);
    }
  }

  render() {
    const { tabIndex, loading, actions } = this.props;
    return (
      <View className={style.records}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="评价服务" />
        </Header>

        <Content>
          <div className="navbar underline driving">
            <a className={classnames('item', {active: tabIndex === 1})} onClick={()=>actions.activeTab(1)}>签约房屋</a>
            <a className={classnames('item', {active: tabIndex === 2})} onClick={()=>actions.activeTab(2)}>入住房屋</a>
          </div>

          {tabIndex === 1 &&
            <Aux>
              {!loading && this.filterList(0).length === 0 &&
                <div className="feedback">
                  <div className="mark">
                    <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
                  </div>
                  <div className="describe">抱歉，您暂未对签约房屋进行评价</div>
                </div>
              }

              {this.filterList(0).map((item, idx) =>(
                <div key={item.bodyId} className={classnames('list text-md', {'compact overlap': idx === 0})} onClick={this.handleClick.bind(this, item)}>
                  <div className="item">
                    <div className="text">{item.roomAddress}</div>
                  </div>
                  {item.status === 0 &&
                    <div className="item">
                      <div className="text text-right text-warning">评价置业服务</div>
                    </div>
                  }
                  {item.status === 1 &&
                    <div className="item">
                      <span className="score">
                        {[1, 2, 3, 4, 5].map(level => {
                          if(item.starScore >= level) {
                            return (<img key={level} width="16" height="16" src="//img1.qdingnet.com/1e0a188f32687edf27b1e7e8426b35cb.png" />);
                          }
                          return (<img key={level} width="16" height="16" src="//img1.qdingnet.com/9888bb543e6614712726c9e6d898fa31.png" />);
                        })}
                      </span>
                      <div className="text text-right text-warning">查看评价详情</div>
                    </div>
                  }
                </div>
              ))}
            </Aux>
          }

          {tabIndex === 2 &&
            <Aux>
              {!loading && this.filterList(1).length === 0 &&
                <div className="feedback">
                  <div className="mark">
                    <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
                  </div>
                  <div className="describe">抱歉，您暂未对入住房屋进行评价</div>
                </div>
              }

              {this.filterList(1).map((item, idx) =>(
                <div key={item.bodyId} className={classnames('list text-md', {'compact overlap': idx === 0})} onClick={this.handleClick.bind(this, item)}>
                  <div className="item">
                    <div className="text">{item.roomAddress}</div>
                  </div>
                  {item.status === 0 &&
                    <div className="item">
                      <div className="text text-right text-warning">评价入住服务</div>
                    </div>
                  }
                  {item.status === 1 &&
                    <div className="item">
                      <span className="score">
                        {[1, 2, 3, 4, 5].map(level => {
                          if(item.starScore >= level) {
                            return (<img key={level} width="16" height="16" src="//img1.qdingnet.com/1e0a188f32687edf27b1e7e8426b35cb.png" />);
                          }
                          return (<img key={level} width="16" height="16" src="//img1.qdingnet.com/9888bb543e6614712726c9e6d898fa31.png" />);
                        })}
                      </span>
                      <div className="text text-right text-warning">查看评价详情</div>
                    </div>
                  }
                </div>
              ))}
            </Aux>
          }
        </Content>
      </View>
    );
  }
}

const mapStateToProps = state => state.modules.guide.records;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Records);
