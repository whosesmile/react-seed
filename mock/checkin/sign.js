// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var prizes = [];
  for (var i = 0; i < 5; i++) {
    prizes.push({
      "description": `累积签到${faker.random.number()}天即可领取`,
      "goodsId": faker.random.number(),
      "goodsImgUrl": faker.image.image(640, 320),
      "goodsName": '一二三四五', //faker.address.city(),
      "minSignInCount": faker.random.number({ max: 30 }),
      "status": 2, //faker.random.arrayElement([0, 1, 2]), // [0：不可领取，1：可领取，2：已领取]
      "tipImgUrl": faker.image.image(300, 300),
    });
  }
  return {
    code: 200,
    data: {
      "signInPrizeInfos": prizes,
    },
  };
}
