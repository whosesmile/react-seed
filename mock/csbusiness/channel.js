// https://github.com/Marak/faker.js/wiki
/*
  商品列表
*/
var faker = require('faker')

var channelList = [];
for (var i = 0; i < 35; i++) {
  channelList.push({
    categoryName: faker.name.jobArea(),
    id: "57017da140fc11e792941866da8c77bf",
    isShowServiceTime: 0,
    pageType: 0,
    pageUrl: "",
    price: faker.random.number(),
    priceRange: "10,20",
    priceType: faker.random.number({ min: 0, max: 1 }),
    productType: 0,
    showImg: "[{'url':'//img1.qdingnet.com/image-381f3fcd-d389-439b-9153-07e663da2935.jpg'}]",
    subTitle: "321312321",
    figure: "//img1.qdingnet.com/image-381f3fcd-d389-439b-9153-07e663da2935.jpg",
    title: faker.name.jobArea(),
    unit: "",
    wareId: 222595
  });
}

module.exports = function() {
  return {
    code: 200,
    data: {
      list: channelList,
      categoryName: '聚合业态',
      templateType: 1,
      totalCount: channelList.length
    }
  };
}
