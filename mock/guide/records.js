// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

var list = [];
for (var i = 0; i < 6; i++) {
  list.push({
    bodyId: faker.random.number(),
    bodyType: faker.random.arrayElement([0, 1]), //[评价主体类型 0 签约，1 入住]
    roomAddress: '北京市-长楹天街住宅-3组团-9栋-1单元102',
    starScore: faker.random.number({ min: 1, max: 5 }),
    status: faker.random.arrayElement([0, 1]), //[评价主体类型 0否 1是]
  });
}

module.exports = {
  code: 200,
  data: {
    list: list,
  },
};
