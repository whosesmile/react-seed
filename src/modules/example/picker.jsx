import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/picker';
import { View, Header, Title, Content, Picker, Widgets } from 'library';

class PickerExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [
        [{ label: '北京', disabled: true, }, { label: '上海' }, { label: '广州' }, { label: '深圳' }, { label: '杭州' }, { label: '南京', disabled: true }],
      ],
    };
  }

  updateGroups = (item) => {
    let groups = this.state.groups;
    if (item.label == '北京') {
      groups[1] = [{ label: '东城' }, { label: '西城' }, { label: '海淀' }, { label: '朝阳' }, { label: '西城' }];
    } else if (item.label == '上海') {
      groups[1] = [{ label: '徐汇' }, { label: '朝阳' }];
    } else if (item.label == '广州') {
      groups[1] = [{ label: '沙坝' }, { label: '天河' }];
    } else if (item.label == '深圳') {
      groups[1] = [{ label: '福田' }, { label: '盐田' }];
    } else if (item.label == '杭州') {
      groups[1] = [{ label: '萧山' }, { label: '西湖' }];
    } else if (item.label == '南京') {
      groups[1] = [{ label: '白下' }, { label: '玄武' }];
    }

    this.setState({ groups });
  }

  render() {
    let { openPicker, closePicker } = this.props.actions;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="Picker" />
        </Header>

        <Content>
          <div className="hspace vspace">
            <button className="button success" onClick={()=>openPicker('pickerA')}>标准单列</button>
          </div>

          <div className="hspace vspace">
            <button className="button driving" onClick={()=>openPicker('pickerB')}>标签、索引、按钮</button>
          </div>

          <div className="hspace vspace">
            <button className="button primary" onClick={()=>openPicker('pickerC')}>标准多列</button>
          </div>

          <div className="hspace vspace">
            <button className="button warning" onClick={()=>openPicker('pickerD')}>多列联动</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>多列联动更新时，变动列的索引会等于变动前的索引</p>
            <p>如果此索引溢出 则取最接近的数值</p>
            <p>如果你希望每次都重置索引 添加参数reset:true</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-success" onClick={()=>openPicker('pickerE')}>联动并重置索引</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>禁用元素: disabled:true (依然会触发change事件)</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-warning" onClick={()=>openPicker('pickerG')}>不可用选项</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>如果希望禁用元素不被选中: adjust: true</p>
            <p>(由于不被选中，自然不会触发change事件)</p>
            <p>(有个特列是所有元素全部不可用，此时adjust会失效)</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-success" onClick={()=>openPicker('pickerH')}>自适应选中</button>
          </div>

          <div className="text-gray text-center vspace hspace text-sm">
            <p>如果希望点击遮罩关闭 设置 dismiss:fn</p>
          </div>

          <div className="hspace vspace">
            <button className="button plain-primary" onClick={()=>openPicker('pickerF')}>点击遮罩关闭</button>
          </div>

        </Content>

        <Widgets>
          <Picker {...{
            show: this.props.pickerA,
            title: '所在城市',
            groups: [
              [{ label: '北京' }, { label: '上海' }, { label: '广州' }, { label: '深圳' }, { label: '杭州' }, { label: '南京' }],
            ],
            dismiss: () => closePicker('pickerA'),
            onCancel: () => closePicker('pickerA'),
            onConfirm: (data,selected) => closePicker('pickerA',data,selected),
          }} />

          <Picker {...{
            show: this.props.pickerB,
            title: '所在城市',
            selected: [2],
            groups: [
              {
                label: item => item.label + '-ZH',
                items: [{ label: '北京' }, { label: '上海' }, { label: '广州' }, { label: '深圳' }, { label: '杭州' }, { label: '南京' }],
              },
            ],
            labels:{cancel: 'Hello', confirm: 'World'},
            dismiss: () => closePicker('pickerB'),
            onCancel: () => closePicker('pickerB'),
            onConfirm: (data,selected) => closePicker('pickerB', data, selected),
          }} />

          <Picker {...{
            show: this.props.pickerC,
            title: '年月不联动',
            groups: [
              [{label: 2015},{label: 2016},{label: 2017}],
              Array(12).fill(1).map((item, index)=> ({label:index+1})),
            ],
            dismiss: () => closePicker('pickerC'),
            onCancel: () => closePicker('pickerC'),
            onConfirm: (data,selected) => closePicker('pickerC', data, selected),
          }} />

          <Picker {...{
            show: this.props.pickerD,
            title: '市区联动',
            groups: this.state.groups,
            onChange: this.updateGroups,
            dismiss: () => closePicker('pickerD'),
            onCancel: () => closePicker('pickerD'),
            onConfirm: (data,selected) => closePicker('pickerD', data, selected),
          }} />

          <Picker {...{
            show: this.props.pickerE,
            title: '市区联动',
            reset: true,
            groups: this.state.groups,
            onChange: this.updateGroups,
            dismiss: () => closePicker('pickerE'),
            onCancel: () => closePicker('pickerE'),
            onConfirm: (data,selected) => closePicker('pickerE', data, selected),
          }} />

          <Picker {...{
            show: this.props.pickerF,
            title: '市区联动',
            reset: true,
            groups: this.state.groups,
            onChange: this.updateGroups,
            dismiss: () => closePicker('pickerF'),
            onCancel: () => closePicker('pickerF'),
            onConfirm: (data,selected) => closePicker('pickerF', data, selected),
          }} />

          <Picker {...{
            show: this.props.pickerG,
            title: '北京南京皆不可用',
            groups: this.state.groups,
            onChange: this.updateGroups,
            dismiss: () => closePicker('pickerG'),
            onCancel: () => closePicker('pickerG'),
            onConfirm: (data,selected) => closePicker('pickerG', data,selected),
          }} />

          <Picker {...{
            show: this.props.pickerH,
            title: '北京南京皆选不中',
            adjust: true,
            groups: this.state.groups,
            onChange: this.updateGroups,
            dismiss: () => closePicker('pickerH'),
            onCancel: () => closePicker('pickerH'),
            onConfirm: (data,selected) => closePicker('pickerH', data,selected),
          }} />
        </Widgets>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.picker;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickerExample);
