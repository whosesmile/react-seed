import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content, Aux } from 'library';
import { Filter, decodeQuery } from 'library/util';

class Express extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { search } = this.props.location;
    const query = decodeQuery(search);
    axios.get('/guide/ajax/express', {
      params: {
        packageNumber: match.params.id,
        packageName: query.company,
      }
    }).then(({ data }) => {
      this.setState({
        express: data,
        loading: false,
      });
    });
  }

  render() {
    const { loading, express } = this.state;
    const { match } = this.props;
    const { search } = this.props.location;
    const query = decodeQuery(search);
    return (
      <View className="logistics">
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="物流详情" />
        </Header>

        <Content>
          { !loading && !express &&
            <div className="feedback">
              <div className="mark">
                <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
              </div>
              <h3 className="title">非常抱歉</h3>
              <div className="describe">暂时还没有此订单的物流信息<br />如有疑问，您可以致电 <a className="link" href="tel:4000818181">4000818181</a> 咨询</div>

              <div className="vspace hspace">
                <a className="button default" onClick={() => this.props.history.go(-1)}>返回</a>
              </div>
            </div>
          }
          { express &&
            <Aux>
              <div className="list compact overlap">
                <div className="item">
                  <span className="text text-sm">
                    <p>承运来源：{ match.params.id }</p>
                    <p>运单编号：{ query.company }</p>
                  </span>
                </div>
              </div>
              <div className="list compact text-gray flow">
                {
                  express.list.map((item, idx) => {
                    return (
                      <div key={ idx } className="item" ui-mode="0px">
                        <div className="time text-right">
                          <p className="text-xs">{ Filter.date(item.time, 'yyyy-MM-dd') }</p>
                          <p className="text-ts">{ Filter.date(item.time, 'hh:mm') }</p>
                        </div>
                        <div className="text text-sm hspace">{ item.context }</div>
                      </div>
                    );
                  })
                }
              </div>
            </Aux>
          }
        </Content>
      </View>
    );
  }

}

export default connect()(Express);
