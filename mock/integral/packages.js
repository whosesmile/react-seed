// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  var count = faker.random.number({ min: 3, max: 6 });
  for (var i = 0; i < count; i++) {
    list.push({
      id: 30,
      goodsName: faker.name.jobArea(),
      consumeIntegral: faker.random.number(1000),
      marketPrice: faker.random.number(1000),
      exchangeStatus: faker.random.number(1),
      // auditAt: faker.date.recent()
      auditAt: new Date(faker.date.recent()).getTime(),
    });
  }
  return {
    code: 200,
    data: {
      list: list
    },
  };
}
