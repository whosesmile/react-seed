// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {

  var list = [];

  for (var i = 0; i < 20; i++) {
    list.push({
      "id": faker.random.arrayElement(["001", "002", 1, 2, 3, 4, 5, 6, 7, 8]),
      "title": faker.name.jobArea(),
      "img": faker.image.image(60, 60),
      "querySmarketSkuBeanList": [{
        skuId: faker.random.arrayElement(["001", "002", 1, 2, 3, 4, 5, 6, 7, 8]),
        skuName: faker.name.jobArea(),
        outSkuTotalPrice: faker.random.arrayElement([1, 5, 10, 15, 20, 25, 30]),
      }],

    })
  }

  return {
    code: 200,
    data: {
      list: list,
      // totalCount:50,
      message: "一切安好",
      toast: "yep",
    }
  };
}
