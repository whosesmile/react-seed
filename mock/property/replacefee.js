// https://github.com/Marak/faker.js/wiki
/*
  获取代缴账单列表
*/
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "sumFee": {
        "debts": 60,
        "prePay": 0
      },
      "custId": 10000200000014,
      "custName": "应映",
      "custType": "业主",
      "canPayFee": 1,
      "remindMsg": "",
      "shouldPay": "60.00",
      "discountAmount": "0.00",
      "feeModelList": [{
        "costName": "应映",
        "feeId": 0,
        "dueAmount": 20,
        "feeDueDate": 1488297600000,
        "debtsAmount": 20,
        "lateFeeAmount": 0,
        "feeDueDateStrMonth": "03月"
      }, {
        "costName": "绿化其它",
        "feeId": 0,
        "dueAmount": 40,
        "feeDueDate": 1488297600000,
        "debtsAmount": 40,
        "lateFeeAmount": 0,
        "feeDueDateStrMonth": "03月"
      }]
    }
  }
}
