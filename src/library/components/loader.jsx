/**
 * 滚动加载
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Loader extends Component {

  static contextTypes = {
    content: PropTypes.object.isRequired,
  };

  static propTypes = {
    url: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    list: PropTypes.array, // 设置默认值 比如从redux中恢复
    query: PropTypes.object, // 查询参数
    page: PropTypes.number,
    size: PropTypes.number,
    tips: PropTypes.string, // 加载文案
    ends: PropTypes.string, // 终点提示文案 传空就是不显示
    blank: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // 空列表提示文案 传空就是不显示
  };

  static defaultProps = {
    page: 0,
    size: 20,
    list: [],
    threshold: 300,
    tips: '努力加载中',
    ends: '亲，我是有底线的',
    blank: '没有相关数据',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: props.page,
      list: props.list,
    };
  }

  componentDidMount() {
    this.listener();
    this.resetPage();
  }

  componentWillUnmount() {
    this.release();
  }

  // 更新查询参数 重置数据并重新加载
  componentWillReceiveProps(nextProps) {
    const props = this.props;
    if (nextProps.url !== props.url || JSON.stringify(nextProps.query) !== JSON.stringify(props.query)) {
      // componentWillReceiveProps方法执行完成后
      // this.props才会被更新为nextProps
      // 所以此处做个延迟执行，以便后面的方法可以通过this.props拿到最新的值
      // 这样不再需要将nextProps依次传递下去了
      requestAnimationFrame(() => {
        this.refresh(nextProps);
      });
    }
  }

  release() {
    if (this.cancel) {
      this.cancel('cancel');
    }

    this.context.content.off('scroll', this.handler);
  }

  listener() {
    this.release();
    this.context.content.on('scroll', this.handler);
  }

  // 核心逻辑
  handler = () => {
    // 判断面板是否被隐藏 滚动时不需要自动加载
    if (!this.panel.offsetParent) {
      return;
    }

    let panel = this.context.content.panel;
    if (!panel) return;
    if (panel.scrollHeight - panel.scrollTop - panel.clientHeight < this.props.threshold) {
      this.loadMore();
    }
  }

  // 重置页码并主动加载
  resetPage() {
    let count = this.state.list.length;
    // 如果默认数据为空 自动加载
    if (count === 0) {
      this.loadMore();
    }
    // 如果默认存在数据 重算页码
    else {
      this.setState({
        page: Math.ceil(count / this.props.size),
      });
    }
  }

  loadMore() {
    // 正在加载
    if (this.state.loading) {
      return;
    }

    let { page, list } = this.state;
    let { size, url, query, callback } = this.props;

    // 如果当前数据小于应当的数量
    // 就认为已经没有下一页数据了
    if (page * size > list.length) {
      return;
    }

    this.setState({ loading: true });

    let params = { page: page + 1, size: size, ...query };
    axios.get(url, {
      params: params,
      global: false, // 不触发全局事件(Toast提示)
      cancelToken: new axios.CancelToken(cancel => this.cancel = cancel),
    }).then(({ data }) => {
      list = list.concat(data.list);
      this.setState({
        list: list,
        data: data,
        page: page + 1,
        loading: false,
      });

      // 不足一页
      if (data.list.length < this.props.size) {
        this.release();
      }

      // 调用回调
      callback(list, data);
    }).catch(() => {
      this.release();
      // this.setState({ loading: false });
    });
  }

  refresh() {
    let { callback } = this.props;
    let { list, data } = this.state;
    // 重置数据
    list.length = 0;
    callback(list, data);

    this.setState({
      page: 0,
      list: list,
      loading: false,
    }, () => {
      this.listener();
      this.resetPage();
    });
  }

  renderStatus() {
    let { list, page, loading } = this.state;
    let { tips, size, ends, blank } = this.props;

    // 正在加载
    if (loading) {
      return (
        <div className="loadmore">
          <i className="loading" />
          <span className="tips text-gray">{ tips }</span>
        </div>
      );
    }
    // 没有数据
    else if (list.length === 0) {
      if (blank) {
        return (
          <div className="feedback">
            <div className="mark">
              <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
            </div>
            <div className="describe">{ blank }</div>
          </div>
        );
      }
    }
    // 达到极限 显示提示 (首页不展示ends信息)
    else if (ends && page > 1 && page * size > list.length) {
      return (
        <div className="divider" ui-mode="30%">{ ends }</div>
      );
    }
  }

  render() {
    let clazz = classnames('loader', this.props.className);
    return (
      <div ref={panel=>this.panel=panel} className={ clazz }>
        { this.props.children }
        { this.renderStatus() }
      </div>
    );
  }
}
