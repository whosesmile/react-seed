// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  for (var i = 0; i < 5; i++) {
    list.push({
      "canUse": faker.random.arrayElement([0, 1, 2, 3, 4]),
      "desc": "完善资料即可领取，马上完善你的资料吧！",
      "giftId": "8aa55da85b1e41ea015b235e18710000",
      "giftImg": faker.random.arrayElement(["//img1.qdingnet.com/f1719be3a0ecc1c3cc22efe70f2b13d0.jpg", "//img1.qdingnet.com/image-8da5763b-0d78-4236-90b7-566183987d18.JPG"]),
      "giftName": faker.random.arrayElement(["费姑娘海鸭蛋70g*10枚", '130元优惠券等你来拿', ]),
      "giftType": faker.random.arrayElement(['1', '2', ]),
      "receiveType": faker.random.arrayElement(['1', '2', '3', ]),
      "skuId": "106407"
    });
  }
  return {
    code: 200,
    data: {
      unclaimedlist: list,
      receivedList: list,
    },
  };
}
