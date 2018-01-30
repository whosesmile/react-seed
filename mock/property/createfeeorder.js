// https://github.com/Marak/faker.js/wiki
/*
  创建代缴订单
*/
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        "orderCode": "WF07500011703271744363662",
        "totalPrice": "60.00",
        "type": "WF",
        "feeOwnersCustid": "10000200000014"
      }
    }
  }
}
