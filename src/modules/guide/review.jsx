import style from './style.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Header, Title, Content } from 'library';

// 评分短语
const PHRASE = [null, '非常差', '差', '一般', '好', '非常好'];

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match } = this.props;
    axios.get('/guide/ajax/review', {
      params: { bodyId: match.params.id },
      cache: true,
    }).then(({ data }) => {
      // 后台命名错误 转换一下
      data.list = data.list.map(item => ({
        labelId: item.lableId || item.labelId,
        labelName: item.lableName || item.labelName,
        starLevel: item.starLevel,
      }));
      this.setState({
        comment: data,
      });
    });
  }

  range(num) {
    let list = [];
    for (let i = 1; i <= num; i++) {
      list.push(i);
    }
    return list;
  }

  render() {
    const { comment } = this.state;
    return (
      <View className={style.comment}>
        <Header>
          <a className="menu" onClick={() => this.props.history.go(-1)}>
            <i className="icon">&#xe60e;</i>
          </a>
          <Title title="查看评价" />
        </Header>

        <Content>
          {comment &&
            <div className="list compact overlap">
              <div className="item thread text-md text-darkgray" ui-mode="15px">
                <span>感受评分</span>
                <span className="score">
                  {this.range(comment.starLevel).map(level => (<img key={level} width="23" height="23" src="//img1.qdingnet.com/1e0a188f32687edf27b1e7e8426b35cb.png" />))}
                </span>
                <span className="text text-right">{ PHRASE[comment.starLevel] }</span>
              </div>

              {comment.list.length > 0 &&
                <div className="item thread tags" ui-mode="0px">
                  <div className="text">
                    { comment.list.map(item => <span key={item.labelName} className="tag active">{ item.labelName }</span>) }
                  </div>
                </div>
              }

              <label className="item thread text-md" ui-mode="15px">
                <div className="text">{comment.content || '这个人很懒，神马都木有写~'}</div>
              </label>
            </div>
          }
        </Content>
      </View>
    );
  }

}

export default connect()(Review);
