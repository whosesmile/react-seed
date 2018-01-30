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
    "data": {
      "evaluatePrompt": "请您对本次出游做出评价~",
      "list": [{
        "flagItem": "2a6ae3858e1611e7bf3844a8421ae0af",
        "flagName": "性价比不高",
        "productNo": "TL",
        "productValue": "旅游线路",
        "score": 1
      }, { "flagItem": "2a67e4db8e1611e7bf3844a8421ae0af", "flagName": "行程不满意", "productNo": "TL", "productValue": "旅游线路", "score": 1 }, { "flagItem": "2a64d94e8e1611e7bf3844a8421ae0af", "flagName": "服务不到位", "productNo": "TL", "productValue": "旅游线路", "score": 1 }, { "flagItem": "2a5c257b8e1611e7bf3844a8421ae0af", "flagName": "吃得不够爽", "productNo": "TL", "productValue": "旅游线路", "score": 2 }, { "flagItem": "2a591d488e1611e7bf3844a8421ae0af", "flagName": "缺少互动", "productNo": "TL", "productValue": "旅游线路", "score": 2 }, { "flagItem": "2a5622fb8e1611e7bf3844a8421ae0af", "flagName": "能便宜点嘛", "productNo": "TL", "productValue": "旅游线路", "score": 2 }, { "flagItem": "2a5332638e1611e7bf3844a8421ae0af", "flagName": "跟想象不同", "productNo": "TL", "productValue": "旅游线路", "score": 2 }, { "flagItem": "2a5042568e1611e7bf3844a8421ae0af", "flagName": "行程有点紧", "productNo": "TL", "productValue": "旅游线路", "score": 2 }, { "flagItem": "2a5c257b8e1611e7bf3844a8421ae0af", "flagName": "吃得不够爽", "productNo": "TL", "productValue": "旅游线路", "score": 3 }, { "flagItem": "2a591d488e1611e7bf3844a8421ae0af", "flagName": "缺少互动", "productNo": "TL", "productValue": "旅游线路", "score": 3 }, { "flagItem": "2a5622fb8e1611e7bf3844a8421ae0af", "flagName": "能便宜点嘛", "productNo": "TL", "productValue": "旅游线路", "score": 3 }, { "flagItem": "2a5332638e1611e7bf3844a8421ae0af", "flagName": "跟想象不同", "productNo": "TL", "productValue": "旅游线路", "score": 3 }, { "flagItem": "2a5042568e1611e7bf3844a8421ae0af", "flagName": "行程有点紧", "productNo": "TL", "productValue": "旅游线路", "score": 3 }, { "flagItem": "2a47be1b8e1611e7bf3844a8421ae0af", "flagName": "家人很开心", "productNo": "TL", "productValue": "旅游线路", "score": 4 }, { "flagItem": "2a44b9368e1611e7bf3844a8421ae0af", "flagName": "风景怡人", "productNo": "TL", "productValue": "旅游线路", "score": 4 }, { "flagItem": "2a4179088e1611e7bf3844a8421ae0af", "flagName": "性价比高", "productNo": "TL", "productValue": "旅游线路", "score": 4 }, { "flagItem": "2a3def768e1611e7bf3844a8421ae0af", "flagName": "服务真贴心", "productNo": "TL", "productValue": "旅游线路", "score": 4 }, { "flagItem": "2a3a21598e1611e7bf3844a8421ae0af", "flagName": "行程合理", "productNo": "TL", "productValue": "旅游线路", "score": 4 }, { "flagItem": "2a47be1b8e1611e7bf3844a8421ae0af", "flagName": "家人很开心", "productNo": "TL", "productValue": "旅游线路", "score": 5 }, { "flagItem": "2a44b9368e1611e7bf3844a8421ae0af", "flagName": "风景怡人", "productNo": "TL", "productValue": "旅游线路", "score": 5 }, { "flagItem": "2a4179088e1611e7bf3844a8421ae0af", "flagName": "性价比高", "productNo": "TL", "productValue": "旅游线路", "score": 5 }, { "flagItem": "2a3def768e1611e7bf3844a8421ae0af", "flagName": "服务真贴心", "productNo": "TL", "productValue": "旅游线路", "score": 5 }, { "flagItem": "2a3a21598e1611e7bf3844a8421ae0af", "flagName": "行程合理", "productNo": "TL", "productValue": "旅游线路", "score": 5 }],
      "message": "",
      "orderGood": { "productId": "4543bef58c9b11e7bf0944a8421ae0af", "productName": "单人价商品0829", "productServiceDetail": "12312", "showImg": "https://img1.qdingnet.com/image-945fb563-a2cf-4026-8403-3c5aa766800a.jpg", "skuId": "" },
      "promotionName": "",
      "toast": ""
    }
  };
}
