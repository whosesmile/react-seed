// https://github.com/Marak/faker.js/wiki
var faker = require('faker');

var list = [];
for (var i = 0; i < 3; i++) {
  list.push({
    "skuId": faker.random.number(),
    "goodsName": faker.name.jobArea(),
    "goodsImg": faker.image.image(60, 60),
    "evaluateImgs": [faker.image.image(60, 60), faker.image.image(60, 60), faker.image.image(60, 60)],
    "score": faker.random.arrayElement([1, 2, 3, 4, 5]),
    "flagNames": ['非诚勿扰', '杀人越货', '居家必备'],
    "anonymousFlag": faker.random.arrayElement([0, 1]),
    "createAt": Date.now(),
  });
}

module.exports = function() {
  return {
    code: 200,
    data: {
      list: list,
    },
  };
}
