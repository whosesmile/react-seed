// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

var list = [];
for (var i = 0; i < 3; i++) {
  list.push({
    "labelId": faker.random.number(),
    "labelName": faker.name.jobArea(),
  });
}

module.exports = {
  code: 200,
  data: {
    status: faker.random.arrayElement([0, 1]), // 0 未评价，1 已经评价
    starLevel: faker.random.arrayElement([1, 2, 3, 4, 5]),
    list: list,
    content: '卡多雷指的是上古时期暗夜精灵的称谓，与现在的暗夜精灵有一定的区别。其他的精灵也有自己的古称，如血精灵为“辛多雷”，高等精灵是“奎尔多雷”.',
  },
};
