// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,

    "data": {
      "entity": {
        "correctCount": "11",
        "incorrectCount": 22,
        "surplusTime": 22
      },
      "message": "ok" //"机会已用完",
    }

  };
}
