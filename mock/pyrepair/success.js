// https://github.com/Marak/faker.js/wiki
/*
  预约成功
*/
var faker = require('faker')

module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        orderCode: "KH65800011706191530484412",
        name: "千丁vip客户",
        mobile:'1888888888'
      },
      message: "预约成功"
    }
  };
}
