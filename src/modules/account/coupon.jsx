import React, { Component } from 'react';
import { View, Header, Title, Content } from 'library';
import { Filter } from 'library/util';

class Coupon extends Component {

  // 懒得写构造器
  state = {};

  componentDidMount() {
    const { match } = this.props;
    axios.get('/account/ajax/coupon', {
      params: {
        code: match.params.code,
      },
      cache: true,
    }).then(({ data }) => {
      this.setState({
        coupon: data.entity,
      });
    });
  }

  renderSesc() {
    const { coupon } = this.state;
    if (coupon.templateType === 4) {
      let desc = coupon.desc || '运营同学很懒，什么都没有填写';
      return desc.split('\n').map((item, idx) => (<p key={idx}>{item}</p>));
    } else {
      return (
        <section>
          <p>1. 本券适用范围：{coupon.productNoNames.join(',')}</p>
          <p>2. 本券{coupon.isExclusive === 1 ? '不' : ''}可以与其它千丁券共同使用</p>
          <p>3. 本券适用于{coupon.isAllProject === 0 ? (coupon.projectName.join(',') || '当前社区') : '所有社区'}</p>
        </section>
      );
    }
  }

  render() {
    const TYPES = { 1: '千丁券', 2: '千丁券', 3: '物业券', 4: '折扣券' };
    const STATUS = { 1: '未使用', 2: '已使用', 3: '已过期', 4: '已作废', 5: '未生效', 6: '已锁定' };
    const { coupon } = this.state;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="千丁券详情" />
        </Header>

        <Content>
          {coupon &&
            <div className="list compact overlap">
              <div className="item">
                <div className="text">
                  <p className="text-justify">
                    <span className="label">状态</span>
                    <span className="value">{STATUS[coupon.status] || '已禁用'}</span>
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="text">
                  <p className="text-justify">
                    <span className="label text-gray">编号</span>
                    <span className="value">NO.{coupon.code}</span>
                  </p>
                  <p className="text-justify">
                    <span className="label text-gray">面值</span>
                    <span className="value text-driving">
                      <span className="text-xs">￥</span>{coupon.price}
                    </span>
                  </p>
                  <p className="text-justify">
                    <span className="label text-gray">类型</span>
                    <span className="value">{TYPES[coupon.templateType] || '千丁券'}</span>
                  </p>
                  <p className="text-justify">
                    <span className="label text-gray">有效期</span>
                    <span className="value">
                      {Filter.date(coupon.startTime, 'yyyy/MM/dd')} - {Filter.date(coupon.endTime, 'yyyy/MM/dd')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          }

          {coupon &&
            <article className="article">
              <h3>使用须知：</h3>
              <section className="text-darkgray">
                {this.renderSesc()}
              </section>
            </article>
          }
        </Content>
      </View>
    );
  }
}

export default Coupon;
