/**
 * 新增地址 编辑地址
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { destroy } from '../../redux';
import { actions } from './ducks/address';
import { View, Header, Footer, Title, Content, Picker, District, Input, Widgets, Toast } from 'library';

class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      groups: [],
      projects: [],
      picker: {},
      district: {},
    };
  }

  componentDidMount() {
    let params = this.props.match.params;
    this.props.actions.fetchAddress(params.id);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  closeDistrict() {
    let { district } = this.state;
    if (district) {
      district.show = false;
      this.setState({ district });
    }
  }

  closePicker() {
    let { picker } = this.state;
    if (picker) {
      picker.show = false;
      this.setState({ picker });
    }
  }

  // 修改数据
  updateBasic = (e) => {
    let { address } = this.props;
    address[e.target.name] = e.target.value;
    this.props.actions.updateAddress(address);
  }

  // 省市区浮层
  handleDistrict = () => {
    let { address } = this.props;
    this.setState({
      district: {
        show: true,
        title: '选择地区',
        pvid: address.provinceId,
        ctid: address.cityId,
        arid: address.areaId,
        dismiss: () => this.closeDistrict(),
        onCancel: () => this.closeDistrict(),
        onConfirm: (data, selected) => this.updateDistrict(data, selected),
      },
    });
  }

  // 更改省市区
  updateDistrict(data) {
    this.closeDistrict();

    let { address } = this.props;
    let [pv, ct, ar] = data;

    // 变更检查
    if (pv.id !== address.provinceId || ct.id !== address.cityId || ar.id !== address.areaId) {
      address.provinceId = pv.id;
      address.provinceName = pv.label;
      address.cityId = ct.id;
      address.cityName = ct.label;
      address.areaId = ar.id;
      address.areaName = ar.label;

      // 重置数据
      this.resetUnder('DISTRICT');
      this.props.actions.updateAddress(address);
    }
  }

  handleProject = () => {
    let { address } = this.props;

    // 前置条件
    if (!address.provinceId || !address.cityId || !address.areaId) {
      return this.props.actions.openToast({
        icon: 'failure',
        message: '请先选择地区',
      });
    }

    this.props.actions.closeToast();
    axios.get('/account/ajax/projects', {
      params: {
        cityId: address.cityId,
        areaId: address.areaId,
      },
      cache: true,
    }).then(({ data }) => {
      // 由于数据会被缓存 不要修改原值
      let projects = [...data.list];
      // 对社区分组处理 插入一个不可选的字母值
      for (let i = projects.length - 1; i >= 0; i--) {
        let prev = projects[i - 1];
        let item = projects[i];
        if (!prev || item.letter !== prev.letter) {
          projects.splice(i, 0, { name: item.letter, disabled: true });
        }
      }
      // 其他社区
      projects.push({ name: '^_^|||', disabled: true });
      projects.push({ id: 0, name: '其他社区' });

      this.setState({
        projects: projects,
        picker: {
          show: true,
          title: '选择社区',
          adjust: true,
          selected: [this.getIndex('PROJECT', projects)],
          groups: [{ items: projects, label: 'name' }],
          dismiss: () => this.closePicker(),
          onCancel: () => this.closePicker(),
          onConfirm: (data, selected) => this.updateProject(data, selected),
        },
      });
    });
  }

  updateProject(data) {
    this.closePicker();

    let { address } = this.props;
    let [project] = data;

    if (address.projectId !== project.id) {
      address.projectId = project.id;
      address.projectName = project.name;
      address.street = project.street;

      // 重置数据
      this.resetUnder('PROJECT');

      // 其他社区 特殊处理
      if (project.id === 0) {
        address.hasGroup = false;
        this.props.actions.updateAddress(address);
      }
      // 是否存在组团
      else {
        axios.get('/location/ajax/project', {
          params: {
            id: project.id
          },
          cache: true,
        }).then(({ data }) => {
          address.hasGroup = data.groups.length > 0;
          this.props.actions.updateAddress(address);
        });
      }
    }
  }

  handleGroups = () => {
    let { address } = this.props;

    // 前置条件
    if (!address.projectId) {
      return this.props.actions.openToast({
        icon: 'failure',
        message: '请先选择社区',
      });
    }

    this.props.actions.closeToast();
    axios.get('/account/ajax/groups', {
      params: {
        projectId: address.projectId,
      },
      cache: true,
    }).then(({ data }) => {
      const groups = data.list.map(item => ({ id: item.groupId, label: item.groupName, address: item.groupAddress }));
      this.setState({
        groups: groups,
        picker: {
          show: true,
          title: '选择组团',
          selected: [this.getIndex('GROUP', groups)],
          groups: [groups],
          dismiss: () => this.closePicker(),
          onCancel: () => this.closePicker(),
          onConfirm: (data, selected) => this.updateGroup(data, selected),
        },
      });
    });
  }

  updateGroup(data) {
    this.closePicker();

    let { address } = this.props;
    let [group] = data;
    if (address.groupId !== group.id) {
      address.groupId = group.id;
      address.groupName = group.label;
      address.groupAddress = group.address;

      // 重置数据
      this.resetUnder('GROUP');
      this.props.actions.updateAddress(address);
    }
  }

  handleHouse = () => {
    let { address } = this.props;

    // 前置条件
    if (!address.projectId) {
      return this.props.actions.openToast({
        icon: 'failure',
        message: '请先选择社区',
      });
    }
    // 组团检查
    if (address.hasGroup && !address.groupId) {
      return this.props.actions.openToast({
        icon: 'failure',
        message: '请先选择组团',
      });
    }

    this.props.actions.closeToast();
    axios.get(address.groupName ? '/account/ajax/grooms' : '/house/ajax/list', {
      params: {
        projectId: address.projectId,
        groupName: address.groupName,
      },
      cache: true,
    }).then(({ data }) => {
      let houses = data.list.map(item => {
        // 兼容组团房屋和社区房屋的不同结构
        item = item.room || item;
        return { id: item.id, label: item.name };
      });
      houses.push({ id: 0, label: '其他房屋' });
      this.setState({
        houses: houses,
        picker: {
          show: true,
          title: '选择房屋',
          selected: [this.getIndex('HOUSE', houses)],
          groups: [houses],
          dismiss: () => this.closePicker(),
          onCancel: () => this.closePicker(),
          onConfirm: (data, selected) => this.updateHouse(data, selected),
        },
      });
    });
  }

  updateHouse(data) {
    this.closePicker();

    let { address } = this.props;
    let [house] = data;
    if (address.roomId !== house.id) {
      address.roomId = house.id;
      address.roomName = house.label;

      // 重置数据
      this.resetUnder('HOUSE');
      this.props.actions.updateAddress(address);
    }
  }

  // 检查错误
  checkAddress() {
    let message = null;
    let { address } = this.props;
    // 联系人
    if (!address.name) {
      message = '请填写姓名';
    }
    // 联系手机
    else if (!address.mobile) {
      message = '请填写手机';
    }
    // 手机格式
    else if (!/^\d{11}$/.test(address.mobile)) {
      message = '手机格式错误';
    }
    // 省市区
    else if (!address.provinceId || !address.cityId || !address.areaId) {
      message = '请选择地区';
    }
    // 因为可能是《其他社区》,所以同时判定ID和NAME,
    else if (!address.projectId && !address.projectName) {
      message = '请选择社区';
    }
    // 如果有组团
    else if (address.hasGroup && !address.groupId) {
      message = '请选择组团';
    }
    // 如果不是其他社区，需要选择房屋
    // 因为可能是《其他房屋》,所以同时判定ID和NAME
    else if (address.projectId && !address.roomId && !address.roomName) {
      message = '请选择房屋';
    }
    // 如果没有房屋，一定要写备注
    else if (!address.roomId && !address.address) {
      message = '请填写地址';
    }

    return message;
  }

  handleSubmit = () => {
    // 检查错误
    let message = this.checkAddress();
    if (message) {
      return this.props.actions.openToast({
        icon: 'failure',
        message: message,
      });
    }

    // 重置社区名称和房屋名称
    let address = {...this.props.address };
    if (address.projectId === 0) {
      delete address.projectId;
      delete address.projectName;
    }
    if (address.roomId === 0) {
      delete address.roomId;
      delete address.roomName;
    }

    // 保存数据
    this.props.actions.closeToast();
    axios.post('/account/ajax/address', address).then(() => {
      let params = this.props.match.params;
      this.props.destroy('addresses');
      this.props.actions.openToast({
        icon: 'success',
        message: params.id ? '编辑成功' : '新增成功',
        modal: true,
      });
      this.timer = setTimeout(() => history.back(), 1500);
    });
  }

  getIndex(type, list) {
    let { address } = this.props;
    if (type === 'HOUSE') {
      return list.findIndex(item => item.id == address.roomId);
    }
    if (type === 'GROUP') {
      return list.findIndex(item => item.id == address.groupId);
    }
    if (type === 'PROJECT') {
      return list.findIndex(item => item.id == address.projectId);
    }
    return -1;
  }

  resetUnder(type) {
    let { address } = this.props;
    const LEVEL = ['DISTRICT', 'PROJECT', 'GROUP', 'HOUSE'].indexOf(type);

    // 重置社区
    if (LEVEL <= 0) {
      address.projectId = null;
      address.projectName = null;
      address.street = null;
    }
    // 重置组团
    if (LEVEL <= 1) {
      address.groupId = null;
      address.groupName = null;
      address.groupAddress = null;
      address.hasGroup = false;
    }
    // 重置房间
    if (LEVEL <= 2) {
      address.roomId = null;
      address.roomName = null;
      address.address = null;
    }
    // 重置地址
    if (LEVEL <= 3) {
      address.address = null;
    }
  }

  render() {
    let { params } = this.props.match;
    let { toast, address } = this.props;
    let { picker, district } = this.state;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title={params.id ? '编辑地址' : '新增地址'} />
        </Header>

        <Content>
          <div className="list compact overlap">
            <label className="item">
              <span className="label">姓名</span>
              <Input className="input" type="text" placeholder="联系人姓名" name="name" value={ address.name || '' } maxLength="20" onChange={ this.updateBasic } />
            </label>
            <label className="item">
              <span className="label">手机</span>
              <Input className="input" type="tel" pattern="[0-9]*" placeholder="联系人手机" name="mobile" value={ address.mobile || '' } maxLength="11" onChange={ this.updateBasic } />
            </label>
          </div>

          <div className="list">
            <div className="item tapable" onClick={this.handleDistrict}>
              <span className="label">所在地区</span>
              {!address.provinceId &&
                <div className="text text-right text-gray">请选择</div>
              }
              {address.provinceId &&
                <div className="text text-right">
                  {address.provinceName }-{address.cityName}-{address.areaName || '其他地区'}
                </div>
              }
              <i className="icon text-gray">&#xe61a;</i>
            </div>
            <div className="item tapable" onClick={ this.handleProject }>
              <span className="label">所属社区</span>
              {!address.projectName &&
                <div className="text text-right text-gray">
                  <span>请选择</span>
                  <div className="brief text-gray">...</div>
                </div>
              }
              {address.projectName &&
                <div className="text text-right">
                  <span>{ address.projectName }</span>
                  <div className="brief text-ellipsis">{ address.street || '未知' }</div>
                </div>
              }
              <i className="icon text-gray">&#xe61a;</i>
            </div>
            {address.hasGroup &&
              <div className="item tapable" onClick={ this.handleGroups }>
                <span className="label">所属组团</span>
                {!address.groupId &&
                  <div className="text text-right text-gray">请选择</div>
                }
                {address.groupId &&
                  <div className="text text-right">{ address.groupName }</div>
                }
                <i className="icon text-gray">&#xe61a;</i>
              </div>
            }
            {/* 其他社区 不显示房屋 */}
            {address.projectId !== 0 &&
              <div className="item tapable" onClick={ this.handleHouse }>
                <span className="label">所属房屋</span>
                {!address.roomName &&
                  <div className="text text-right text-gray">请选择</div>
                }
                {address.roomName &&
                  <div className="text text-right">{ address.roomName }</div>
                }
                <i className="icon text-gray">&#xe61a;</i>
              </div>
            }
            {!address.roomId &&
              <div className="item">
                <div className="text">
                  <textarea className="textarea" rows="3" placeholder="请填写详细地址" name="address" maxLength={ 100 } value={ address.address || '' } onChange={ this.updateBasic } />
                  <div className="textarea-counter"><span>{ (address.address || '').length }</span>/100</div>
                </div>
              </div>
            }
          </div>
        </Content>

        <Footer>
          <button className="button driving square" onClick={this.handleSubmit}>保存地址</button>
        </Footer>

        <Widgets>
          <Toast {...toast} />
          <Picker {...picker} />
          <District {...district} />
        </Widgets>
      </View>
    );
  }
}

const mapStateToProps = state => state.modules.account.address;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  destroy: (view = 'address') => dispatch(destroy('account', view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
