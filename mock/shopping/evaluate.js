// https://github.com/Marak/faker.js/wiki
var faker = require('faker');

var goods = [];
for (var i = 0; i < 2; i++) {
  goods.push({
    "goodsDesc": faker.lorem.sentences(2),
    "goodsName": faker.name.jobArea(),
    "markingCode": faker.random.number(),
    "markingName": faker.random.number(),
    "skuImgUrl": [faker.image.image(60, 60)],
    "wareId": faker.random.number(),
  });
}

var list = [];
for (var i = 0; i < 18; i++) {
  list.push({
    "flagItem": faker.random.number(),
    "flagName": faker.name.jobArea(),
    "productNo": faker.random.number(),
    "productValue": faker.name.jobArea(),
    "score": faker.random.arrayElement([1, 2, 3, 4, 5]),
  });
}

module.exports = function() {
  return {
    code: 200,
    data: {
      // GET
      orderGoods: goods,
      list: list,
      evaluatePrompt: '',
      promotionName: 5,

      // POST
      score: faker.random.arrayElement([1, 2, 3, 4, 5]),
      integralScore: faker.random.number(),
      couponList: [{
        couponId: faker.random.number(),
        couponName: '呵呵呵呵',
        couponPrice: '5',
        validStart: Date.now(),
        validEnd: Date.now(),
      }, {
        couponId: '123123',
        couponName: '呵呵呵呵',
        couponPrice: '15',
        validStart: Date.now(),
        validEnd: Date.now(),
      }],
      message: '您已经评论过了',
    },
  };
}
