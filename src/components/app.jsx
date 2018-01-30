import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'library';
import { Env } from 'library/util';
import { ROUTER_CHANGED } from '../redux';
import { routes } from '../schema';
import NoMatch from './nomatch';

const EFFECTS = {
  // left2right or right2left
  LEFT_RIGHT: { forward: 'ex-move-ltr', backward: 'ex-move-rtl' },
  // bottom2top or top2bottom
  TOP_BOTTOM: { forward: 'ex-move-btt', backward: 'ex-move-ttb' },
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      effect: EFFECTS.LEFT_RIGHT,
      // effect: EFFECTS.TOP_BOTTOM,
      // 默认前进
      direction: 'forward',
      // 从浏览器历史恢复，如果没有认定为首页
      key: history.state && history.state.key || null,
    };

    this.restore();
    this.subcribe();
  }

  // 恢复数据
  restore() {
    // 仅限浏览器环境
    if (Env.is('browser')) {
      const keys = JSON.parse(sessionStorage.getItem('keys') || '[null]');
      // 移除旧数据
      while (keys.length > window.history.length) {
        keys.pop();
      }

      this.keys = keys;

      window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('keys', JSON.stringify(keys));
      });
    }
    // 服务端渲染不需要
    else {
      this.keys = [null];
    }
  }

  // 核心动画方法
  subcribe() {
    let keys = this.keys;
    let { history, dispatch } = this.props;

    // 使用block而不要使用listen
    // 因为内置的createBrowserHistroy注册了第一个listen方法，内包含setState调用，这导致在我们计算前进还是后退之前更新UI，使得动画可能失败
    // 起因是一个误解：多次调用setState在eventHanlder之外并不会自动优化合并, 每次都会调用render，尽管并不会真正更新UI但依然会导致问题
    // 参见: https://stackoverflow.com/questions/33613728/what-happens-when-using-this-setstate-multiple-times-in-react-component
    history.block((location, action) => {

      dispatch({ type: ROUTER_CHANGED, payload: this.state.key });

      // PUSH
      if (action === 'PUSH') {
        // 历史回退后 继续前进 要丢弃前面的历史
        if (this.state.key) {
          let prev = keys.indexOf(this.state.key);
          if (prev !== -1) {
            keys.splice(prev + 1);
          }
          // 找不到数据 异常情况
          else {
            // TODO？
          }
        }
        // 如果在首页刷新后前进 直接清空 0是首页应当为空
        else {
          keys.length = 1;
        }
        keys.push(location.key);
        this.setState({ key: location.key, direction: 'forward' });
      }
      // REPLACE
      else if (action === 'REPLACE') {
        // 替换历史
        if (this.state.key) {
          let prev = keys.indexOf(this.state.key);
          if (prev !== -1) {
            keys[prev] = location.key;
          }
          // 找不到数据 异常情况
          else {
            // TODO?
          }
        }
        // 如果在首页刷新后替换 直接清空 0是首页应当为空
        else {
          keys[0] = location.key;
        }
        this.setState({ key: location.key, direction: 'forward' });
      }
      // POP
      else {
        if (this.state.key) {
          let prev = keys.indexOf(this.state.key);
          let next = keys.indexOf(location.key);

          if (prev > next) {
            this.setState({ key: location.key, direction: 'backward' });
          } else {
            this.setState({ key: location.key, direction: 'forward' });
          }
        }
        // 首页只能前进 后退会回到浏览器
        else {
          this.setState({ key: location.key, direction: 'forward' });
        }
      }
      // awalys return true
      return true;
    });
  }

  render() {
    let timeout = { enter: 300, exit: 300 };
    let { location, background } = this.props;
    let { effect, direction } = this.state;

    return (
      <Layout background={background}>
        <TransitionGroup id="main">
          <CSSTransition classNames={effect[direction]} key={location.key} timeout={timeout}>
            <Switch location={location}>
              {
                routes.map(item=>(
                  <Route key={item.path} exact={item.exact} path={item.path} component={item.component} />
                ))
              }
              <Route component={NoMatch} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Layout>
    );
  }

}

const mapStateToProps = state => ({
  background: state.background,
});

export default connect(mapStateToProps)(App);
