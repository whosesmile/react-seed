import React, { Component } from 'react';
import { View, Header, Title, Content } from 'library';

class Protocol extends Component {

  render() {
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="千丁券使用说明" />
        </Header>

        <Content>
          <article className="article">
            <section>
              <p>1. 千丁券需在有效期内使用，过期无效。使用千丁券时，千丁券优惠部分不开具发票。</p>
              <p>2. 每张千丁券均有适用的服务，在使用券时,只能选取该服务适用的千丁券。点击千丁券后，在券的详情页可查看该券适用的服务。</p>
              <p>3. 在手机APP上或线下付款时，都可以使用千丁券。经验证通过后，券金额即可抵扣相应的订单金额。</p>
              <p>4. 一个订单，只能使用一张千丁券；千丁券不与其他任何优惠同时使用。</p>
              <p>5. 每张千丁券只能使用一次，千丁券不找零、不可兑换为现金或其它等价物。</p>
              <p>6. 千丁券不记名，不挂失，不可出售与转让，不可购买其他千丁券类产品。</p>
              <p>7. 在相关法律允许范围内，千丁互联享有对千丁券的最终解释权。</p>
              <p>8. 使用千丁券购买的产品，支持签收前整单或部分退款，因消费者自身原因发起的退款，已使用的千丁券会直接作废；因平台原因引发的退款，消费者可向客服中心提出退换千丁券申请（联系电话：4000818181），经千丁平台审核通过之后会依据千丁券规则发放等值的千丁券到消费者的千丁钱包。</p>
            </section>
          </article>
        </Content>
      </View>
    );
  }
}

export default Protocol;
