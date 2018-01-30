// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      "id": "ea04f44b5aee11e7b9bb1866da8c77bf", // id
      "img": "https://image1.jyall.com/v1/tfs/T1wxWjByAT1RXrhCrK.jpg"
    });
  }
  return {
    code: 200,
    data: {
      list: list,
    }
  };
}
