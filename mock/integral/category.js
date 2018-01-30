// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

module.exports = function() {
  return {
    "code": 200,
    "data": {
      "message": "success",
      "list": [{
        "id": 1,
        "name": "优惠礼券"
      }, {
        "id": 2,
        "name": "食品饮料"
      }, {
        "id": 3,
        "name": "数码家电"
      }, {
        "id": 4,
        "name": "日常家居"
      }, {
        "id": 5,
        "name": "数码家电"
      }, {
        "id": 6,
        "name": "日常家居"
      }]
    }
  };
};
