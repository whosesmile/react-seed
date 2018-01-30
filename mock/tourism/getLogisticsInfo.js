// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "list": [{
        "list": [{
          "orderStatusContent": "[北京市] [北京顺义林河]的派件已签收 感谢使用中通快递,期待再次为您服务!",
          "recordTime": 1503631850000
        }, {
          "orderStatusContent": "[北京市] 快件已到达[北京顺义林河],业务员澜西15311810643正在第1次派件 电话:15311810643 请保持电话畅通、耐心等待",
          "recordTime": 1503616724000
        }, { "orderStatusContent": "[北京市] 快件离开 [北京]已发往[北京顺义林河]", "recordTime": 1503561642000 }, { "orderStatusContent": "[北京市] 快件到达 [北京]", "recordTime": 1503560063000 }, {
          "orderStatusContent": "[深圳市] 快件离开 [深圳中心]已发往[北京]",
          "recordTime": 1503421793000
        }, {
          "orderStatusContent": "[深圳市] 快件到达 [深圳中心]",
          "recordTime": 1503421740000
        }, { "orderStatusContent": "[深圳市] 快件离开 [深圳新石岩]已发往[北京]", "recordTime": 1503410088000 }, { "orderStatusContent": "[深圳市] [深圳新石岩]的启承贸易已收件 电话:暂无", "recordTime": 1503400154000 }, { "orderStatusContent": "您的订单已分拣出库，即将开始配送。", "recordTime": 1505726148819 }],
        "logisticsCode": "450599822054",
        "logisticsName": "中通",
        "subOrderCode": "TL68500011709181713517462_1"
      }],
      "message": "",
      "toast": ""
    }
  };
}
