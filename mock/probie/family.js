// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "list": [{
        "name": "单身贵族",
        "type": 1
      }, {
        "name": "二人世界",
        "type": 2
      }, {
        "name": "家有儿女",
        "type": 3
      }, {
        "name": "几世同堂",
        "type": 4
      }, {
        "name": "其他",
        "type": 5
      }],
    }
  };
};
