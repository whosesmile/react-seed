// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "entity": {
        "bigWheelFlag": 1,
        "bigWheelLotteryResult": {
          "isLottery": 2,
          "prizeName": "一个奖品",
          "message": "成功的其他信息"
        }
      },
      "message": "其他错误" //"机会已用完",
    }
  };
}
