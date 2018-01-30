// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "entity": {
        "effectDateEnd": 0,
        "effectDateStart": 0,
        "list": [{
          "sellPrice": 300,
          "specDate": 1515836800000,
          "specialList": [],
          "stockNum": 7
        }, {
          "sellPrice": 300,
          "specDate": 1515923200000,
          "specialList": [],
          "stockNum": 7
        }, {
          "sellPrice": 500,
          "specDate": 1516009600000,
          "specialList": [],
          "stockNum": 6
        }, {
          "sellPrice": 300,
          "specDate": 1516441600000,
          "specialList": [],
          "stockNum": 6
        }, {
          "sellPrice": 300,
          "specDate": 1516528000000,
          "specialList": [],
          "stockNum": 8
        }]
      },
      "message": "查询成功",
      "toast": ""
    }
  }
}
