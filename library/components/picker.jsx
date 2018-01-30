/**
 * 选择器
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import MaskLayer from './masklayer';
import { Env } from '../util';

export default class Picker extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    reset: PropTypes.bool,
    adjust: PropTypes.bool,
    // 两种格式
    // groups: [[ item, item, ...], [ item, item, ...] ],
    // groups: [{ items: [item, item, ...], key: value }, { items: [item, item, ...], key: value }],
    groups: PropTypes.array.isRequired,
    labels: PropTypes.object,
    selected: PropTypes.array,
    dismiss: PropTypes.func,
    onChange: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    show: false,
    reset: false,
    adjust: false,
    groups: [],
    labels: { cancel: '取消', confirm: '确定' },
    onCancel: () => {},
    onConfirm: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      // 如果没有传值 默认使用-1
      selected: props.selected ? [...props.selected] : Array(props.groups.length).fill(-1),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && JSON.stringify(nextProps.selected) !== JSON.stringify(this.props.selected)) {
      this.setState({
        selected: [...nextProps.selected],
      });
    }
  }

  // 无效选择
  isInValid() {
    let groups = this.props.groups;
    let selected = this.state.selected;
    let result = false;
    groups.forEach((group, i) => {
      // 兼容数组格式
      let items = Array.isArray(group) ? group : group.items;
      let item = items[selected[i]];
      if (item && item.disabled) {
        result = true;
      }
    });
    return result;
  }

  // 联动处理
  handleChange = (item, i, groupIndex) => {
    let selected = this.state.selected;
    selected[groupIndex] = i;

    if (this.props.onChange) {
      this.props.onChange(item, i, groupIndex, selected, this);
    }

    // 每次更新是否重置联动列索引
    if (this.props.reset && selected.length > groupIndex + 1) {
      selected[groupIndex + 1] = -1;
    }

    // 如果重置索引为-1，会再次触发onChange
    this.setState({ selected });
  }

  // 确认选定
  handleConfirm = () => {
    if (this.props.onConfirm) {
      let data = this.props.groups.map((group, i) => {
        // 兼容数组格式
        let items = Array.isArray(group) ? group : group.items;
        return items[this.state.selected[i]];
      });
      this.props.onConfirm(data, this.state.selected);
    }
  }

  render() {
    let { show, title, groups, labels, adjust, dismiss, onCancel } = this.props;
    return (
      <CSSTransition in={show} unmountOnExit={true} classNames="ex-widget" timeout={300}>
        <MaskLayer dismiss={ dismiss }>
          <div className="picker">
            <div className="header">
              <a className="button literal inline text-nm text-gray" onClick={ onCancel }>{ labels.cancel }</a>
              <h4 className="title">{ title }</h4>
              <a className="button literal inline text-nm text-driving" disabled={ this.isInValid() } onClick={ this.handleConfirm }>{ labels.confirm }</a>
            </div>
            <div className="content">
              {
                groups.map((group, idx) => {
                  // 兼容数组格式
                  group = Array.isArray(group) ? {items: group} : group;
                  return (<PickerGroup  key={ idx } index={ idx } adjust={ adjust } selected={ this.state.selected[idx] } onChange={ this.handleChange } { ...group } />);
                })
              }
            </div>
          </div>
        </MaskLayer>
      </CSSTransition>
    );
  }
}

class PickerGroup extends Component {

  static propTypes = {
    height: PropTypes.number,
    itemHeight: PropTypes.number,
    animation: PropTypes.bool,
    items: PropTypes.array.isRequired,
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    index: PropTypes.number,
    selected: PropTypes.number,
    adjust: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    height: 238,
    itemHeight: 34,
    animation: true,
    index: 0,
    selected: -1,
    adjust: false,
    label: 'label',
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      touchId: null,
      touching: false,
      stpoint: 0,
      sttrans: 0,
      translate: 0,
      selected: this.props.selected,
      animating: this.props.animation,
    };
  }

  handleChange(propagate = true) {
    let { items, index } = this.props;
    if (propagate) {
      this.props.onChange(items[this.state.selected], this.state.selected, index);
    }
  }

  componentDidMount() {
    this.adjustOffset(this.props);
    this.panel.addEventListener('touchmove', this.handleTouchMove, Env.supportPassive ? {
      passive: false,
    } : false);
  }

  componentWillReceiveProps(nextProps) {
    this.adjustOffset(nextProps);
  }

  componentWillUnmount() {
    this.panel.removeEventListener('touchmove', this.handleTouchMove);
  }

  // 自动调整定位偏移
  adjustOffset(props) {
    let { selected, items, height, itemHeight } = props;
    if (items.length === 0) {
      return;
    }
    let propagate = false;

    // 防止溢出
    if (selected > items.length - 1) {
      selected = items.length - 1;
      propagate = true;
    }
    // 找到最接近的值
    if (selected < 0) {
      selected = 0;
      propagate = true;
    }

    // 自动调整禁用元素
    let backup = selected;
    selected = this.adjustDisabled(selected);
    if (selected !== backup) {
      propagate = true;
    }

    let volume = height / itemHeight;
    let median = (volume - 1) / 2;

    this.setState({
      touching: false,
      animating: true,
      sttrans: 0,
      stpoint: 0,
      touchId: null,
      selected: selected,
      translate: (median - selected) * itemHeight,
    }, () => {
      this.handleChange(propagate);
    });
  }

  // 自动调整禁用元素
  adjustDisabled(selected) {
    let { items, adjust } = this.props;
    if (adjust !== true) {
      return selected;
    }
    let count = items.length;
    if (selected < 0) {
      selected = 0;
    }
    if (selected >= count) {
      selected = count - 1;
    }

    // 记录初始位置
    let start = selected;
    if (items[selected].disabled === true) {
      while (items[selected].disabled === true) {
        selected += 1;

        // 找到底部
        if (selected >= count) {
          selected = 0;
        }

        // 防止死循环
        if (selected === start) {
          selected = start;
          break;
        }
      }
    }

    return selected;
  }

  handleTouchStart = (e) => {
    if (this.state.touching || this.props.items.length <= 1) {
      return;
    }

    this.setState({
      touching: true,
      animating: false,
      sttrans: this.state.translate,
      stpoint: e.targetTouches[0].pageY,
      touchId: e.targetTouches[0].identifier,
    });
  }

  handleTouchMove = (e) => {
    if (!this.state.touching || this.props.items.length <= 1) {
      return;
    }
    if (e.targetTouches[0].identifier !== this.state.touchId) {
      return;
    }

    this.setState({
      translate: this.state.sttrans + (e.targetTouches[0].pageY - this.state.stpoint),
    });

    e.preventDefault();
  }

  handleTouchEnd = () => {
    if (!this.state.touching || this.props.items.length <= 1) {
      return;
    }

    // 计算位置
    const { height, itemHeight } = this.props;
    let volume = height / itemHeight;
    let median = (volume - 1) / 2;
    let count = this.props.items.length;
    let translate = this.state.translate;

    // 超过上限
    if (translate > median * itemHeight) {
      translate = median * itemHeight;
    }
    // 超过下限
    else if (translate < (-count + median + 1) * itemHeight) {
      translate = (-count + median + 1) * itemHeight;
    }
    // 校准位置
    else if (translate % itemHeight !== 0) {
      let adjust = translate % itemHeight;
      if (Math.abs(adjust) > itemHeight / 2) {
        translate += adjust > 0 ? itemHeight - adjust : -itemHeight - adjust;
      } else {
        translate -= adjust;
      }
    }

    let backup = this.state.selected;

    // 尝试自动调整 (disabled)
    let selected = this.adjustDisabled(median - translate / itemHeight);
    translate = (median - selected) * itemHeight;

    this.setState({
      touching: false,
      animating: true,
      sttrans: 0,
      stpoint: 0,
      touchId: null,
      selected: selected,
      translate: translate,
    }, () => {
      if (backup !== selected) {
        this.handleChange();
      }
    });
  }

  renderLabel(item, index) {
    let label = null;
    if (typeof this.props.label === 'function') {
      label = this.props.label(item, index);
    } else {
      label = item[this.props.label];
    }
    return label;
  }

  render() {
    let styles = {
      WebkitTransform: `translate3d(0,${this.state.translate}px,0)`,
      WebkitTransition: this.state.animating ? 'transform .3s, -webkit-transform .3s' : 'none',
      transform: `translate3d(0,${this.state.translate}px,0)`,
      transition: this.state.animating ? 'transform .3s, -webkit-transform .3s' : 'none',
    };
    return (
      <div ref={panel => this.panel = panel} className="group" onTouchStart={ this.handleTouchStart } onTouchEnd={ this.handleTouchEnd }>
        <div className="roller" style={ styles }>
          {
            this.props.items.map((item, idx) => (
              <div key={ idx } className={ classnames('item', {disabled: item.disabled}) }>{ this.renderLabel(item, idx) }</div>
            ))
          }
        </div>
      </div>
    );
  }

}
