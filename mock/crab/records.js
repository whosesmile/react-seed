// https://github.com/Marak/faker.js/wiki
var faker = require('faker');

var list = [];
for (var i = 0; i < 20; i++) {
  list.push({
    "orderCode": faker.random.number(),
    "payAt": new Date(faker.date.recent()).getTime(),
    "receiverAddress": '北京朝阳区长楹天街星座7栋1888',
    "receiverName": faker.name.jobArea(),
    "receiverPhone": "18610535297",
    "skuId": faker.random.number(),
    "skuImgUrl": faker.image.image(75, 75),
    "skuName": faker.name.jobArea(),
    "skuPrice": faker.random.number(),
    "skuCouponNum": faker.random.number(),
  });
}
module.exports = function() {
  return {
    code: 200,
    data: {
      list: list,
    }
  };
}
