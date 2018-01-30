// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list =  [{
      "activityInfo": [],
      "countSkuSellNum": 297,
      "countWareSellNum": 297,
      "deliveryType": 1,
      "goodsDesc": "米易黄草小樱桃预售中，预计发货时间4月中旬，第一批果实成熟即发货！高原小樱桃，色如其味！",
      "goodsId": "24181",
      "goodsImg": [
        "https://img1.qdingnet.com/image-4ce6f4da-d5fa-467d-9892-87bf7472581a.png?imageView2/1/w/344/h/344",
        "https://img1.qdingnet.com/image-d1184d72-9d97-41ab-84c9-4a7092ae5e23.jpg?imageView2/1/w/344/h/344"]
      }];
  return {
    code: 200,
    data: {
      list: list,
    }
  };
}
