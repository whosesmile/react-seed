import style from './style.less';
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { destroy } from '../../redux';
import { actions } from './ducks/home';
import { View, Header, Footer, Title, TabBar, Content, BLink } from 'library';
import { Env, Filter, scrollToY, getOffset } from 'library/util';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  componentDidMount() {
    this.props.actions.services();
    this.panel.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.panel.removeEventListener('scroll', this.handleScroll);
    // 清空对应的store数据
    this.props.destroy();
  }

  switchTab(index) {
    this.setState({
      tabIndex: index,
    });
  }

  switchAni(index) {
    this.lock = true;
    this.switchTab(index);
    let end = this.getTopOffset(index);
    // 滚动动画 lock是为了不再触发滚动过程的切换TAB效果
    scrollToY(this.panel, end, () => {
      this.lock = false;
    });
  }

  getTopOffset(index) {
    const element = document.querySelectorAll('.groups .group')[index];
    return getOffset(element, this.panel).top;
  }

  getHeight(index) {
    if (this.props.list.length == index + 1) {
      return { height: document.documentElement.clientHeight - (Env.nested ? 50 : 100) };
    }
    return null;
  }

  // 处理
  handleScroll = () => {
    if (this.lock) return;
    for (var i = this.props.list.length - 1; i >= 0; i--) {
      let top = this.getTopOffset(i);
      if (top <= this.panel.scrollTop) break;
    }
    this.switchTab(i);
  }

  render() {
    return (
      <View className={style.home}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="千丁服务" />
        </Header>

        <Content coord ref={content=>this.panel=content&&content.panel}>
          {this.props.list.length > 0 &&
            <aside className={classnames({nested: Env.nested})}>
              {
                this.props.list.map((item, idx) => {
                  return (<a key={ idx } className={ classnames('item', {active: this.state.tabIndex == idx}) } onClick={ this.switchAni.bind(this, idx) }>{ item.title }</a>);
                })
              }
            </aside>
          }
          <div className="groups">
            {
              this.props.list.map((group, idx) => {
                return (
                  <div key={ idx } className="group" style={ this.getHeight(idx) }>
                    <h4 className="text-sm">{ group.title }</h4>
                    <div className="items">
                      {
                        group.services.map((item, index) => {
                          return (
                            <BLink key={ index } className="item" to="/settings">
                              <img width="54" height="54" src={ Filter.thumb(item.imageUrl, 58, 58) } />
                              <p className="text-ellipsis text-darkgray text-ts">{ item.name }</p>
                            </BLink>
                          );
                        })
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
        </Content>

        <Footer>
          <TabBar type="services" />
        </Footer>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.home.home;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  destroy: (view = 'home') => dispatch(destroy('home', view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
