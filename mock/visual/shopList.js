// https://github.com/Marak/faker.js/wiki
/*
  商品列表
*/
var faker = require('faker')

var channelList = [];
for (var i = 0; i < 35; i++) {
  channelList.push({
    id: "57017da140fc11e792941866da8c77bf", // 商品id
    name: faker.name.jobArea(),
    mainImg: "//img1.qdingnet.com/image-381f3fcd-d389-439b-9153-07e663da2935.jpg", //商品主图
    marketPrice: faker.random.number(), //单位分
    sellPrice: faker.random.number(),//单位分
    shortDesc: "商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介",
  });
}

module.exports = function() {
  return {
    code: 200,
    data: {
      list: channelList,
      categoryName: '优惠券列表',
      totalCount: channelList.length,
      message:"查询成功"
    }
  };
}
