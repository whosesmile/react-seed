/**
 * 延迟加载
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getOffset } from '../util';

export default class LazyImg extends Component {

  static contextTypes = {
    content: PropTypes.object.isRequired,
  };

  static propTypes = {
    src: PropTypes.string.isRequired,
    mark: PropTypes.string,
  };

  static defaultProps = {
    mark: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.listener();
    this.context.content.on('ready', this.handler);
  }

  componentWillUnmount() {
    this.release();
  }

  listener() {
    this.release();
    this.context.content.on('scroll', this.handler);
  }

  release() {
    clearTimeout(this.timer);
    this.context.content.off('scroll', this.handler);
  }

  // 缩减帧率
  frameReduce(fn) {
    clearTimeout(this.timer);
    this.timer = setTimeout(fn, 300);
  }

  handler = () => {
    this.frameReduce(() => {
      let th = 150; // 阈值
      let img = this.img;
      let panel = this.context.content.panel;
      if (panel) {
        let pt = panel.scrollTop; // 滚动距离
        let ph = panel.offsetHeight; // 容器可视高度
        let et = getOffset(img, panel).top; // 图片上沿距离
        let eb = et + img.offsetHeight; // 图片下沿距离
        // 图片需要刚好落在视口范围内(这里有个假定是图片不会比容器的可视高度还高)
        // 图片上沿 <= 滚动距离 + 容器可视高度 + 阈值 && 图片下沿 >= 滚动距离 - 阈值
        if (et <= pt + ph + th && eb >= pt - th) {
          img.setAttribute('src', this.props.src);
          this.release();
        }
      }
    });
  }

  render() {
    let { src, mark, ...others } = this.props;
    return (
      <img ref={img =>this.img=img} src={mark} { ...others }  />
    );
  }
}
