// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      list: [{
        orderStatusContent: "客户已签收",
        recordTime: 1482207314000
      }, {
        orderStatusContent: "离开 [北京_配送区部_大山子营业所_三间房营业厅] 派送中，递送员[刘龙 ]，电话[18931812046]",
        recordTime: 1482191551000
      }, {
        orderStatusContent: "到达 [北京_配送区部_大山子营业所_三间房营业厅]",
        recordTime: 1482190594000
      }, {
        orderStatusContent: "离开 [北京_配送区部_北京同城分拨站] 发往 [北京_配送区部_大山子营业所_三间房营业厅]",
        recordTime: 1482159698000
      }, {
        orderStatusContent: "到达 [北京_配送区部_北京同城分拨站]",
        recordTime: 1482154258000
      }, {
        orderStatusContent: "已取件，离开 [北京_配送区部_丰台营业所_西红门营业厅] 发往 [北京_配送区部_北京同城分拨站]",
        recordTime: 1482145531000
      }],
      logisticsCode: "0952099411",
      logisticsName: "宅急送"
    },
  };
}
