// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      detailId: faker.random.number(),
      optPoints: faker.random.number(),
      optTime: new Date(faker.date.recent()).getTime(),
      optType: 1,
      productName: faker.name.jobArea(),
      surplusPoints: faker.random.number(),
    });
  }
  return {
    code: 200,
    data: {
      list: list
    },
  };
}
