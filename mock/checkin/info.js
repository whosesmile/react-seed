// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var dates = [];
  // for (var i = 1; i <= new Date().getDate(); i++) {
  //   if (Math.random() > 0.5) {
  //     dates.push(i);
  //   }
  // }
  var prizes = [];
  for (var i = 0; i < 5; i++) {
    prizes.push({
      "description": `累积签到${faker.random.number()}天即可领取`,
      "goodsId": faker.random.number(),
      "goodsImgUrl": "https://img1.qdingnet.com/83dacd724e0c20466c7e80df36f1aec9.png",
      "goodsName": '一二三四五六七八九十', //faker.address.city(),
      "minSignInCount": faker.random.number(),
      "status": 2, //faker.random.arrayElement([0, 1, 2]), // [0：不可领取，1：可领取，2：已领取]
      "tipImgUrl": faker.image.image(300, 300),
    });
  }
  return {
    code: 200,
    data: {
      "signInCount": 1,
      "signInDays": dates,
      "signInPrizeInfos": prizes,
    },
  };
}
