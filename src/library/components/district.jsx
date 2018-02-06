/**
 * 省市区定位选择
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from './picker';

class District extends Component {

  static propTypes = {
    pvid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 省
    ctid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 市
    arid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 区
    title: PropTypes.string,
    show: PropTypes.bool,
    labels: PropTypes.object,
    dismiss: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    show: false,
    title: '选择地址',
    onCancel: () => {},
    onConfirm: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.state.groups) {
      axios.get('/account/ajax/areadict', { cache: true }).then(({ data }) => {
        let list = JSON.parse(data.areaJsonStr);
        this.setState(this.destructor(list));
      });
    }
  }

  // 数据结构不满足情况 需要重新解析一次
  destructor(list) {
    // 省市区三组数据
    let groups = Array(3).fill([]);
    // 默认全部未选择
    let selected = Array(3).fill(-1);

    // 仅需填充省份 市会自动调用updateGroup渲染 区会依次类推
    groups[0] = list.map(item => ({
      id: item.id,
      label: item.name,
      disabled: item.disabled,
      list: item.regions,
    }));

    // 是否默认选中
    const { pvid, ctid, arid } = this.props;

    // 省
    if (pvid) {
      selected[0] = groups[0].findIndex(item => item.id == pvid);
      groups[1] = this.getCities(groups[0][selected[0]]);
    }
    // 市
    if (pvid && ctid) {
      selected[1] = groups[1].findIndex(item => item.id == ctid);
      groups[2] = this.getAreas(groups[1][selected[1]]);
    }
    // 区
    if (pvid && ctid && arid) {
      selected[2] = groups[2].findIndex(item => item.id == arid);
    }

    return {
      groups: groups,
      selected: selected,
    };
  }

  // 根据省份返回城市列表
  getCities(data) {
    return data.list.map(item => ({
      id: item.id,
      label: item.name,
      disabled: item.disabled,
      list: item.districts,
    }));
  }

  // 根据城市返回地区列表
  getAreas(data) {
    return data.list.map(item => ({
      id: item.id,
      label: item.name,
      disabled: item.disabled,
    }));
  }

  // 省份变更 根据省份的List数据映射为城市列表
  provinceChanged(data) {
    let groups = this.state.groups;
    groups[1] = this.getCities(data);

    // 刷新数据
    this.setState({ groups });
  }

  // 城市变更 根据城市的List数据映射为地区列表
  cityChanged(data) {
    let groups = this.state.groups;
    groups[2] = this.getAreas(data);

    // 刷新数据
    this.setState({ groups });
  }

  updateGroup = (data, i, groupIndex) => {
    // 省份变更
    if (groupIndex === 0) {
      this.provinceChanged(data);
    }
    // 城市变更
    if (groupIndex === 1) {
      this.cityChanged(data);
    }
  }

  render() {
    let { selected = [], groups = [], } = this.state;
    let { show, title, labels, dismiss, onCancel, onConfirm } = this.props;

    let props = {
      reset: true,
      show: show,
      title: title,
      labels: labels,
      groups: groups,
      selected: selected,
      dismiss: dismiss,
      onChange: this.updateGroup,
      onCancel: onCancel,
      onConfirm: onConfirm,
    };
    return (<Picker { ...props } />);
  }
}

export default District;
