// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,

    "data": {
      "entity": {
        // "prizeName": "宝宝",
        "prizeType": 1 // 奖品类型（1-实物、2-千丁券、3-积分、4-转盘
      },
      "message": "ok" //"机会已用完",
    }

  };
}
