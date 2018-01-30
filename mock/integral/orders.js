// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      id: faker.random.number(),
      orderCode: 'JF' + faker.random.number(),
      consumeIntegral: faker.random.number(),
      goodsName: faker.name.jobArea(),
      coverImg: faker.image.image(300, 300),
      goodsType: faker.random.arrayElement(['TICKET', 'ENTITY', 'FLOW']),
      status: faker.random.number({ min: 0, max: 6 }),
    });
  }
  return {
    code: 200,
    data: {
      list: list
    },
  };
}
