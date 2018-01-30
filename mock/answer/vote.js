// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,

    "data": {
      "entity": {
        "bigWheelFlag": 1,
        "bigWheelLotteryResult": {
          "isLottery": 1,
          "prizeName": "好东西"
        }
      },
      "message": "其他错误" //"机会已用完",
    }

  };
}
