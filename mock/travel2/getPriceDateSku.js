// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "list": [{
        "specDate": 1493697538111, //日期规格
        "sellPrice": 699,
      }, {
        "specDate": 1493798538111, //日期规格
        "sellPrice": 199,
        "roomType": 3 //销售价格
      }, {
        "specDate": 1494707538111, //日期规格
        "sellPrice": 199,
        "roomType": 3 //销售价格
      }, {
        "specDate": 1496697538111, //日期规格
        "sellPrice": 199,
        "roomType": 3 //销售价格
      }, {
        "specDate": 1510707538111, //日期规格
        "sellPrice": 199,
        "roomType": 3 //销售价格
      }, {
        "specDate": 1510807538111, //日期规格
        "sellPrice": 199,
        "roomType": 3 //销售价格
      }, {
        "specDate": 1510907538111, //日期规格
        "sellPrice": 199,
        "roomType": 3 //销售价格
      }]
    }
  }
}
