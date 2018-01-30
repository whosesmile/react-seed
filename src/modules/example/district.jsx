import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/district';
import { View, Header, Title, Content, District, Widgets } from 'library';

class DistrictExample extends Component {

  render() {
    let { A = {}, B = {}, showA, showB } = this.props;
    let { openDistrict, closeDistrict, chooseDistrict } = this.props.actions;
    return (
      <View>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="District" />
        </Header>

        <Content>
          <div className="hspace vspace">
            <button className="button success" onClick={()=>openDistrict('showA')}>无默认值(例如新增)</button>
          </div>
          <div className="list">
            <div className="item">
              <div className="text">{A.pvid ? `${A.pvname}-${A.ctname}-${A.arname}` : '尚未选择'}</div>
            </div>
          </div>

          <div className="divider">分割线</div>

          <div className="hspace vspace">
            <button className="button primary" onClick={()=>openDistrict('showB')}>有默认值(例如编辑)</button>
          </div>

          <div className="list">
            <div className="item">
              <div className="text">{B.pvid ? `${B.pvname}-${B.ctname}-${B.arname}` : '尚未选择'}</div>
            </div>
          </div>
        </Content>

        <Widgets>
          <District {...{
            show:showA,
            pvid: A.pvid,
            ctid: A.ctid,
            arid: A.arid,
            dismiss: () => closeDistrict('showA'),
            onCancel: () => closeDistrict('showA'),
            onConfirm: (data,selected) => chooseDistrict('showA', data, selected),
          }} />

          <District {...{
            show: showB,
            pvid: B.pvid,
            ctid: B.ctid,
            arid: B.arid,
            dismiss: () => closeDistrict('showB'),
            onCancel: () => closeDistrict('showB'),
            onConfirm: (data,selected) => chooseDistrict('showB', data, selected),
          }} />
        </Widgets>
      </View>
    );
  }

}

const mapStateToProps = state => state.modules.example.district;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DistrictExample);
