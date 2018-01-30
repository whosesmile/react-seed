/**
 * Swipe 仅适用于手机端的touch事件
 *
 * list 数据
 * loop 循环
 * decorators 脚标
 * paddingTop 高度
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Env } from '../util';

// 滑动处理
class Slide {

  constructor(params) {
    this.options = {};
    this.params = params;
    this.init();
  }

  init = () => {
    this.tar = this.params.roller;
    this.tarChildLen = this.tar.children.length;
    this.tip = this.params.loop ? 1 : 0; //下面小点的位置
    this.transform(this.offset(-this.tip * 100), 0);

    // 事件监听
    this.tar.addEventListener('touchstart', this.touchstart, false);
    this.tar.addEventListener('touchmove', this.touchmove, Env.supportPassive ? { passive: false } : false);
    this.tar.addEventListener('touchend', this.touchend, false);

    if (this.params.loop) { //循环临界点处理
      this.tar.addEventListener('webkitTransitionEnd', this.webkitTransitionEnd, false);
    }
    if (this.params.autoplay && !this.timer) {
      this.timer = setInterval(this.interval, 4000);
    }
  }

  offset(val) {
    return `translate3d(${val}%, 0px, 0px)`;
  }

  _start = () => { //初始化开始位置（刚触摸和自动动画开启时调用）
    this.options.index = this.tip;
    this.options.tar3D = -this.options.index * 100 || 0;
  }

  _reback = () => { //恢复原来位置
    this.transform(this.offset(this.options.tar3D));
  }

  _end = (d) => { //进入下一个tap
    let slsWrap3D;
    if (d == 'Left') {
      if (this.options.index == this.tarChildLen - 1) return this._reback();
      this.params.callback(parseInt(this.tip) + 1);
      slsWrap3D = this.options.tar3D - 100;
    } else {
      if (this.options.index == 0) return this._reback();
      this.params.callback(parseInt(this.tip) - 1);
      slsWrap3D = this.options.tar3D + 100;
    }
    this.tip = -slsWrap3D / 100;
    this.transform(this.offset(slsWrap3D));
  }

  touchstart = (e) => {
    if (this.timer) {
      clearInterval(this.timer);
      delete this.timer;
    }
    this._start();
    this.options.x1 = e.touches[0].pageX;
    // e.preventDefault(); //会阻止click 和touchend相同（以真机测试为准）
  }

  touchmove = (e) => {
    this.options.x2 = e.touches[0].pageX;
    let tar3D = this.options.tar3D + (this.options.x2 - this.options.x1) / this.tar.offsetWidth * 100;
    this.transform(this.offset(tar3D), 0);
    e.preventDefault();
  }

  touchend = () => {
    let d = this.options.x1 - this.options.x2 > 0 ? 'Left' : 'Right';
    let isToNext = Math.abs(this.options.x1 - this.options.x2) > this.tar.offsetWidth / 5 ? true : false;
    if (isToNext) {
      this._end(d);
    } else {
      this._reback();
    }
    //点击事件 touchmove不会触发 this.options.x2不能保持原来的值
    delete this.options.x2;
    if (this.params.autoplay && !this.timer) {
      this.timer = setInterval(this.interval, 4000);
    }
  }

  webkitTransitionEnd = () => {
    let end3D;
    let index = parseInt(this.tip);
    if (index == 0) {
      end3D = 100 * (2 - this.tarChildLen);
      this.tip = -end3D / 100;
      this.transform(this.offset(end3D), '0ms');
    } else if (index == this.tarChildLen - 1) {
      end3D = -100;
      this.tip = -end3D / 100;
      this.transform(this.offset(end3D), '0ms');
    }
  }

  release = () => {
    clearInterval(this.timer);
    this.tar.removeEventListener('touchstart', this.touchstart);
    this.tar.removeEventListener('touchmove', this.touchmove);
    this.tar.removeEventListener('touchend', this.touchend);
    this.tar.removeEventListener('webkitTransitionEnd', this.webkitTransitionEnd);
  }

  transform = (transform, transition = '300ms') => { //动画处理
    this.tar.style.webkitTransform = transform;
    this.tar.style.transform = transform;
    this.tar.style.webkitTransition = transition;
    this.tar.style.transition = transition;
  }

  interval = () => { //自动播放处理
    if (!this.params.loop) {
      let index = parseInt(this.tip);
      let end3D = 0;
      if (index == this.tarChildLen - 1) {
        this.tip = 0;
        this.transform(this.offset(end3D));
        this.params.callback(this.tip);
        return;
      }
    }
    this.options.x1 = 0;
    this.options.x2 = this.options.x1 - (this.tar.offsetWidth / 5 + 1);
    this._start();
    this.touchend();
  }

  go = (cid, loop) => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.tip = cid;
    let end3D = -cid * 100;
    if (loop) {
      this.tip = cid + 1;
      end3D = -this.tip * 100;
    }
    this.transform(this.offset(end3D));
    this.params.callback(this.tip);
    if (this.params.autoplay && !this.timer) {
      this.timer = setInterval(this.interval, 4000);
    }
  }
}

class Swipe extends Component {

  static propTypes = {
    list: PropTypes.array,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
    decorators: PropTypes.bool,
    callback: PropTypes.func,
    paddingTop: PropTypes.string.isRequired,
  };

  static defaultProps = {
    list: [],
    loop: false,
    autoplay: true,
    decorators: true,
    callback: n => n,
  };

  constructor(props) {
    super(props);
    // 循环需要改变结构 以便效果上首尾相连
    let list = [...props.list];
    if (props.loop && list.length > 1) {
      list = [list[list.length - 1], ...list, list[0]];
    }
    this.state = {
      index: 0,
      list: list,
    };
  }

  componentDidMount() {
    const { list } = this.state;
    if (list.length > 1) {
      this.startSwipe();
    }
  }

  componentWillUnmount() {
    if (this.slide) {
      this.slide.release();
    }
  }

  startSwipe = () => {
    const { loop, autoplay } = this.props;
    this.slide = new Slide({
      loop: loop,
      autoplay: autoplay,
      roller: this.roller,
      callback: this.handleSlide,
    });
  }

  handleSlide = (index) => {
    const { list, loop, decorators } = this.props;
    const size = list.length;
    if (decorators) {
      if (loop) {
        index = (index - 1 + size) % size;
      }
      this.setState({ index });
    }

    this.props.callback(index);
  }

  render() {
    let { className, paddingTop } = this.props;
    return (
      <div className={classnames('carousel', className)} style={{ paddingTop: paddingTop }} >
        <div className="roller" ref={n=>this.roller=n} style={{WebkitTransform: 'translate3d(0%, 0px, 0px)', transform: 'translate3d(0%, 0px, 0px)', WebkitTransition: '0ms', transition: '0ms'}}>
          {this.state.list.map((item, idx) => {
            if (typeof item === 'string') {
              item = {src: item};
            }
            const {src, ...others} = item;
            return (
              <div key={idx} className="slider" style={{WebkitTransform: `translate3d(${idx*100}%, 0px, 0px)`, transform: `translate3d(${idx*100}%, 0px, 0px)`}} {...others}>
                <div className="frame"><img src={item.src} /></div>
              </div>
            );
          })}
        </div>
        {this.props.decorators &&
          <ul className="decorators">
            {this.props.list.map((item, idx) => {
              return (<li key={Math.random()} className={classnames('item', {active: idx === this.state.index})} onClick={()=>this.slide.go(idx, this.props.loop)} />);
            })}
          </ul>
        }
      </div>
    );
  }
}

export default Swipe;
