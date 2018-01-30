// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "entity": {
        "skuBeanList": [{
          "id": "edeaeccd772511e7bf0944a8421ae0af",
          "packageName": "成人/2017-08-03/四星酒店",
          "platformSkuId": "19600",
          "sellPrice": 5,
          "specDate": 1501689600000,

        }, {
          "id": "edec7239772511e7bf0944a8421ae0af",
          "packageName": "成人/2017-08-03/五星酒店",
          "platformSkuId": "19601",
          "sellPrice": 5,
          "specDate": 1501689600000,

        }, {
          "id": "edec7239772511e7bf0944a661ae0af",
          "packageName": "儿童1/2017-08-03/五星酒店",
          "platformSkuId": "19601",
          "sellPrice": 5,
          "specDate": 1501689600000,

        }, {
          "id": "edec7239772511e7bf2944a8421ae0af",
          "packageName": "儿童2/2017-08-03/五星酒店",
          "platformSkuId": "19601",
          "sellPrice": 5,
          "specDate": 1501689600000,

        }],
        "specParBeanList": [{
          "id": "220",
          "name": "新旅游产品标准",
          "sort": 100,
          "values": [{
            "id": "449",
            "name": "四星酒店",
            "sort": 2
          }, {
            "id": "448",
            "name": "五星酒店",
            "sort": 1
          }, {
            "id": "450",
            "name": "三星酒店",
            "sort": 3
          }]
        }]
      },
    }
  }
}
