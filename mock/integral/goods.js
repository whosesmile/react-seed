// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      id: faker.random.number(),
      goodsName: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
      consumeIntegral: faker.random.number(),
      coverImg: faker.image.image(300, 300),
      // coverImg: 'https://img1.qdingnet.com/image-268d5860-648e-44e4-b568-17b93a4491e5.jpg?imageView2/2/w/305/h/305',
      marketPrice: faker.random.number(),
      exchangeStatus: faker.random.number(1),
      // auditAt: faker.date.recent()
      auditAt: new Date(faker.date.recent()).getTime(),
    });
  }
  return {
    code: 200,
    data: {
      list: list
    },
  };
}
