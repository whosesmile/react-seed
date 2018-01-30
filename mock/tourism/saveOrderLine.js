// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "entity": {
        "orderCode": "TL63871238128",
      },
      "message": "查询成功"
    }
    // code: 500,
    // "data": {
    //   "entity": {
    //     "orderCode": "TL63871238128",
    //   },
    //   "message": "错误信息"
    // }

    // code: 500,
    // "data": {
    //   "entity": {
    //     "orderCode": "TL63871238128",
    //   },
    //   "message": "库存不足"
    // }

  };
}
