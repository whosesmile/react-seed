// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "list": [{
        "id": "2c9180905ccdee16015ccdf1d8770001",
        "promotionId": "2c9180905ccdee16015ccdf1d8690000",
        "status": 1,
        "validStart": Date.now() + 5000,
        "validEnd": Date.now() + 100000,
      }]
    }
  };
}
