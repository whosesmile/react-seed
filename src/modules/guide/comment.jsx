import style from './style.less';
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './ducks/comment';
import { destroy } from '../../redux';
import { View, Header, Title, Content, Footer, Toast, Modal, Widgets } from 'library';

// 评分短语
const PHRASE = [null, '非常差', '差', '一般', '好', '非常好'];

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      list: [],
      score: 5,
      content: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    axios.get('/guide/ajax/tags', {
      params: {
        bodyType: match.params.type,
      },
      cache: true,
    }).then(({ data }) => {
      this.setState({
        // 后台命名错误 转换一下
        tags: data.list.map(item => ({
          labelId: item.lableId || item.labelId,
          labelName: item.lableName || item.labelName,
          starLevel: item.starLevel,
        })),
      });
    });
  }

  handleScore(level) {
    if (this.state.score !== level) {
      this.setState({
        list: [],
        score: level,
      });
    }
  }

  handleTaged(labelId) {
    let { list } = this.state;
    if (list.indexOf(labelId) !== -1) {
      list.splice(list.indexOf(labelId), 1);
    } else {
      list.push(labelId);
    }
    this.setState({ list });
  }

  handleContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  }

  handleSubmit = () => {
    const { actions } = this.props;
    const { score, list, content } = this.state;
    // 3-5分 评论选填 但是给出提示
    if (score >= 3) {
      if (!content.length && !list.length) {
        return actions.openModal({
          title: '温馨提示',
          message: '亲，你神马评论都木有写哦！',
          buttons: [
            { text: '返回填写', onClick: actions.closeModal },
            { text: '坚决提交', onClick: this.sendComment, }
          ]
        });
      }
    }
    // < 3分 评论必填
    else if (!content.length && !list.length) {
      return actions.openToast({
        icon: 'failure',
        message: '还未填写评价',
      });
    }
    // 一切正常
    this.sendComment();
  }

  sendComment = () => {
    const { actions, history, match } = this.props;
    const { score, list, content } = this.state;
    actions.closeModal();
    axios.post('/guide/ajax/comment', {
      bodyId: match.params.id,
      bodyType: match.params.type,
      starLevel: score,
      lableIds: list,
      content: content,
    }).then(() => {
      this.props.destroy('records');
      actions.openModal({
        title: '温馨提示',
        message: '你的评论提交成功，感谢您的参与！',
        buttons: [{
          text: '返回列表',
          onClick: () => {
            actions.closeModal();
            history.go(-1);
          }
        }, {
          text: '查看评论',
          onClick: () => {
            actions.closeModal();
            history.replace(`/guide/review/${match.params.id}`);
          }
        }]
      });
    });
  }

  getStarImg(level) {
    return this.state.score >= level ? '//img1.qdingnet.com/1e0a188f32687edf27b1e7e8426b35cb.png' : '//img1.qdingnet.com/9888bb543e6614712726c9e6d898fa31.png';
  }

  filterTags() {
    return this.state.tags.filter(item => item.starLevel === this.state.score);
  }

  render() {
    const tags = this.filterTags();
    const { list, score, content } = this.state;
    const { toast, modal } = this.props;
    return (
      <View className={style.comment}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="评价服务" />
        </Header>

        <Content>
          <div className="list compact overlap">
            <div className="item thread text-md text-darkgray" ui-mode="15px">
              <span>感受评分</span>
              <span className="score">
                {[1, 2, 3, 4, 5].map(level => (<img key={level} width="23" height="23" onClick={ this.handleScore.bind(this, level) } src={this.getStarImg(level)} />))}
              </span>
              <span className="text text-right">{ PHRASE[score] }</span>
            </div>

            {tags.length > 0 &&
              <div className="item thread tags" ui-mode="0px">
                <div className="text">
                  { tags.map(item => <span key={item.labelId} className={ classnames('tag', {active: list.indexOf(item.labelId) !== -1}) } onClick={ this.handleTaged.bind(this, item.labelId) }>{ item.labelName }</span>) }
                </div>
              </div>
            }

            <label className="item thread">
              <div className="text">
                <textarea className="textarea" rows="3" placeholder="说说你对服务的评价吧~" maxLength="100" value={ content } onChange={ this.handleContent } />
                <div className="textarea-counter"><span>{ content.length }</span>/100</div>
              </div>
            </label>
          </div>
        </Content>

        <Footer>
          <button className="button driving square" onClick={this.handleSubmit}>匿名提交</button>
        </Footer>

        <Widgets>
          <Modal {...modal} />
          <Toast {...toast} />
        </Widgets>
      </View>
    );
  }
}

const mapStateToProps = state => state.modules.guide.comment;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  destroy: (view) => dispatch(destroy('guide', view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
