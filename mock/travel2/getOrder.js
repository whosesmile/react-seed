// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "baseToken": "",
      "entity": {
        "couponCodePromotion": {
          "discount": "1",
          "promotionId": "1293",
          "promotionName": "测试新旅游",
          "totalCouponPrice": ""
        },
        "goodsPromotiones": [],
        "legouStatus": 0,
        "logisticsInfo": null,
        "orderBase": {
          "createTime": 1489651315248,
          "evaluateStatus": 0,
          "isPayOnline": 0,
          "memberId": "2c9180895a7f1560015aa7ace63c162e",
          "memberMobile": "18311331039",
          "memberName": "大聪",
          "orderCode": "TL38300011703161601551812",
          "orderStatus": 203,
          "paddress": "",
          "paymentStatus": 101,
          "paymentTime": 0,
          "paymentType": 21,
          "shouldPay": "1.00",
          "sourceType": 0,
          "totalDiscount": "1.00",
          "totalPrice": "2.00",
          "totalRealPay": "1.00"
        },
        "orderDelivery": {
          "deliveryAddress": "",
          "deliveryId": "",
          "expressPrice": "0",
          "receivePostCode": "",
          "receiveUserName": "",
          "receiveUserPhone": ""
        },
        "orderGoods": [{
          "buyNum": 1,
          "deliveryType": 1,
          "goodsDesc": "",
          "goodsId": "2484",
          "goodsName": "0309-1标题",
          "orderCode": "TL38300011703161601551812",
          "price": "2.00",
          "skuId": "8362",
          "skuImgUrl": [],
          "subOrderCode": "TL38300011703161601551812_1"
        }],
        "orderInvoice": null,
        "orderPromotiones": [],
        "receiveAddr": ""
      },
      "message": "",
      "toast": ""
    }
  };
}
