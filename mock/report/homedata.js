// https://github.com/Marak/faker.js/wiki
/*
  首页数据
*/
var faker = require('faker')

module.exports = function() {
  return {
    code: 200,
    data: {
      list: [{
        "topic_type": "jiaoyi",
        "topicText": "交易",
        "list": [{
          "topic_type": "jiaoyi",
          "text": "GMV(万元)",
          "key": "GMV",
          "value": 10.5,
          "huanbi": 20
        }, {
          "topic_type": "jiaoyi",
          "text": "收入(万元)",
          "key": "shouru",
          "value": 10.5,
          "huanbi": 30
        }, {
          "topic_type": "jiaoyi",
          "text": "退货率",
          "key": "tuihuolv",
          "value": 20,
          "huanbi": 20.2
        }, {
          "topic_type": "jiaoyi",
          "text": "补贴率",
          "key": "butielv",
          "value": 29,
          "huanbi": -20.4
        }]
      }, {
        "topic_type": "tuozhan",
        "topicText": "拓展(新增)",
        "list": [{
          "topic_type": "tuozhan",
          "text": "签约面积(㎡)",
          "key": "qianyue_mianji",
          "value": 5000,
          "huanbi": 10
        }]
      }, {
        "topic_type": "yonghu",
        "topicText": "用户",
        "list": [{
          "topic_type": "yonghu",
          "text": "绑定人数",
          "key": "bangding_renshu",
          "value": 1395,
          "huanbi": 20
        }, {
          "topic_type": "yonghu",
          "text": "注册人数",
          "key": "zhuce_renshu",
          "value": 2706,
          "huanbi": 30
        }, {
          "topic_type": "yonghu",
          "text": "活跃人数",
          "key": "huoyue_renshu",
          "value": 155686,
          "huanbi": -20
        }, {
          "topic_type": "yonghu",
          "text": "购买人数",
          "key": "goumai_renshu",
          "value": 1185,
          "huanbi": 20
        }]
      }],
      errorMsg: '成功',
    }
  };
}
