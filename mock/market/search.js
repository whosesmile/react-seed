// https://github.com/Marak/faker.js/wiki
// 产品名称
var faker = require('faker');
const title = ["米易黄草小樱桃", "花本九朵玫瑰下午茶", "伊利乳酸奶", "无线鼠标"];

//生成商品数据
function makeData(level) {
  let goods = {
    "id": faker.random.arrayElement(['001', '002', 1, 2, 3, 4, 4, 5, 6]),
    "title": faker.random.arrayElement(title),
    "goodsId": "24181",
    "img": faker.image.image(60, 60),
  }

  if (level == 1) {
    goods.querySmarketSkuBeanList = [];
    for (var i = 0; i < 5; i++) {
      goods.querySmarketSkuBeanList.push({
        skuId: faker.random.arrayElement(['001', '002', 1, 2, 3, 4, 5, 6, 7, 8]),
        skuName: faker.random.arrayElement(title),
        outSkuTotalPrice: faker.random.arrayElement([10, 20, 15, 56, 34]),
      })
    }
  }
  return goods;
}

var list = [];
for (var i = 0; i < 20; i++) {
  list.push(makeData(1))
}

module.exports = function() {

  return {
    code: 200,
    data: {
      list: list,
      totalCount: 50,
      message: "一切安好",
      toast: "yep",
    }
  };
}
