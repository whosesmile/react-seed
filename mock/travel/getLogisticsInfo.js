// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "list": [{
        "orderStatusContent": "由北京航空公司空运发货", //状态描述
        "recordTime": 1450409298624 //记录时间
      }, {
        "orderStatusContent": "已转运朝阳集散地，准备分单",
        "recordTime": 1450405035918
      }],
      "logisticsCode": "SY002002002020020202020", //快递单号
      "logisticsName": "申通快递", //快递公司
      "message": ""
    }
  };
}
