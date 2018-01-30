import style from './style.less';
import React, { Component } from 'react';
import { View, Header, Title, Content, Widgets, Modal, Toast } from 'library';
import { Filter, Env } from 'library/util';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './ducks/settings';
import { updateMember } from '../../redux';

class Settings extends Component {

  state = {};

  componentDidMount() {
    axios.get('/account/ajax/promoter', { cache: true }).then(({ data }) => {
      this.setState({
        promoter: data,
      });
    });
  }

  handleAvatar = (e) => {
    const input = e.target;
    if (input.files.length === 0) {
      return false;
    }
    const data = new FormData();
    data.append('file', input.files[0]);
    axios.post('/common/ajax/upload', data, {
      headers: { 'content-type': 'multipart/form-data' },
    }).then(({ data }) => {
      const avatar = data.list[0].path;
      this.props.updateMember({ memberAvatar: avatar });
    }).finally(() => input.value = '');
  }

  handleNick = () => {
    const { member, actions } = this.props;
    actions.openModal({
      title: '修改昵称',
      message: (
        <div className="list compact form">
          <label className="item">
            <span className="label text-right" ui-mode="48px">昵称</span>
            <div className="text">
              <input ref={input => this.input = input} className="input" placeholder="请输入您的昵称" maxLength="20" defaultValue={member.memberName} />
            </div>
          </label>
        </div>
      ),
      buttons: [{
        text: '取消',
        onClick: actions.closeModal,
      }, {
        text: '确定',
        onClick: () => {
          const value = this.input.value;
          // 重复
          if (value.trim() === member.memberName) {
            return actions.closeModal();
          }
          // 空白
          if (value.trim().length === 0) {
            return actions.openToast({
              icon: 'failure',
              message: '请输入昵称',
            });
          }

          // 更新
          actions.closeModal();
          this.props.updateMember({ memberName: value });
        },
      }],
    });
  }

  handleGender = (e) => {
    const gender = e.target.value;
    this.props.updateMember({ memberGender: gender });
  }

  handleSign = () => {
    const { member, actions } = this.props;
    actions.openModal({
      title: '修改个性签名',
      message: (
        <div className="list compact form">
          <label className="item">
            <span className="label text-right" ui-mode="48px">签名</span>
            <div className="text">
              <input ref={input => this.input = input} className="input" placeholder="最多36个字..." maxLength="36" defaultValue={member.memberSignature} />
            </div>
          </label>
        </div>
      ),
      buttons: [{
        text: '取消',
        onClick: actions.closeModal,
      }, {
        text: '确定',
        onClick: () => {
          const value = this.input.value;
          // 重复
          if (value.trim() === member.memberSignature) {
            return actions.closeModal();
          }
          // 空白
          if (value.trim().length === 0) {
            return actions.openToast({
              icon: 'failure',
              message: '请输入签名',
            });
          }

          // 更新
          actions.closeModal();
          this.props.updateMember({ memberSignature: value });
        },
      }],
    });
  }

  render() {
    const { promoter } = this.state;
    const { member, project, modal, toast } = this.props;

    return (
      <View className={style.settings}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="我的资料" />
        </Header>

        <Content>
          <div className="list compact overlap">
            <div className="item">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/image-aea91c98-c87d-453c-b2ce-048b74772acc.png" />
              </div>
              <div className="text">头像</div>
              <div className="avatar">
                <img width="40" height="40" src={Filter.thumb(member.memberAvatar, 150, 150)} />
                <input type="file" name="file" onChange={this.handleAvatar} />
              </div>
              <i className="icon text-gray">&#xe61a;</i>
            </div>
            <div className="item" onClick={this.handleNick}>
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/image-ebadc6cf-0241-4053-b901-358d621ec3ce.png" />
              </div>
              <span className="text">昵称</span>
              <span className="extra">{member.memberName}</span>
              <i className="icon text-gray">&#xe61a;</i>
            </div>
            <label className="item">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/image-5b5bd99d-8ec9-480f-b124-9ab33284677e.png" />
              </div>
              <span className="label">性别</span>
              <div className="text text-gray">
                <select className="select" dir="rtl" defaultValue={member.memberGender} onChange={this.handleGender}>
                  <option value="1">男</option>
                  <option value="0">女</option>
                  <option value="-1">保密</option>
                </select>
              </div>
              <i className="icon text-gray">&#xe61a;</i>
            </label>
            <div className="item" onClick={this.handleSign}>
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/image-c8c98888-939d-4104-87d1-44ed0d2f854c.png" />
              </div>
              <span className="text">个性签名</span>
              <span className="extra">{member.memberSignature}</span>
              <i className="icon text-gray">&#xe61a;</i>
            </div>
          </div>

          <div className="list">
            <a className="item" href="/house">
              <div className="avatar">
                <img width="16" src="//img1.qdingnet.com/image-01261f56-8353-44e1-b5b7-d55dd28cf799.png" />
              </div>
              <span className="text">我的房屋</span>
              <span className="extra">{project.name}</span>
              <i className="icon text-gray">&#xe61a;</i>
            </a>
            {promoter && promoter.support &&
              <a className="item" href="/promoter">
                <div className="avatar">
                  <img width="16" src="//img1.qdingnet.com/image-5b406fb6-7cce-436b-a5ce-fe45ccbaefce.png" />
                </div>
                <span className="text">我的推广码</span>
                <span className="extra">
                  {promoter.agreement ? '有推广码' : '没有推广码'}
                </span>
                <i className="icon text-gray">&#xe61a;</i>
              </a>
            }
          </div>

          {Env.is('wx') && !member.memberMobile &&
            <div className="list">
              <a className="item" href="/account/improve">
                <div className="avatar">
                  <img width="16" src="//img1.qdingnet.com/image-b3794852-6b3f-4eca-aecd-3917068d041a.png" />
                </div>
                <span className="text">未绑定手机</span>
                <i className="icon text-gray">&#xe61a;</i>
              </a>
            </div>
          }

          {!Env.is('wx') && !Env.is('ali') &&
            <div className="list">
              <a className="item" href="/account/logout">
                <div className="avatar">
                  <img width="16" src="//img1.qdingnet.com/image-ffe29b9d-fb3a-48aa-98f5-f551634576c8.png" />
                </div>
                <span className="text">退出登录</span>
                <i className="icon text-gray">&#xe61a;</i>
              </a>
            </div>
          }
        </Content>

        <Widgets>
          <Modal {...modal} />
          <Toast {...toast} />
        </Widgets>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modules.account.settings,
  member: state.member,
  project: state.project,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  updateMember: (props) => dispatch(updateMember(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
