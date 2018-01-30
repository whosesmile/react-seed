// https://github.com/Marak/faker.js/wiki
/*
  获取代缴的客户列表
*/
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "custModelList": [{
        "custId": 10000200000014,
        "custName": "应映",
        "custType": "业主",
        "totalFee": "60.00"
      }, {
        "custId": 10000200000016,
        "custName": "郑敏",
        "custType": "租户",
        "totalFee": "51.00"
      }, {
        "custId": 10000200005329,
        "custName": "李晓云",
        "custType": "业主",
        "totalFee": "50.00"
      }]
    }
  }
}
