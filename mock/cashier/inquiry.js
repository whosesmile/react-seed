// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = {
  code: 200,
  data: {
    "entity": {
      "isShowNotice": false,
      "notice": "",
      "promotionList": [{
        "create_at": 0,
        "create_by": "",
        "discount": "10",
        "discountCostProvider": "0",
        "discountCostType": 1,
        "id": "",
        "isPayCallBack": 0,
        "isRefundall": 0,
        "isUseCoupon": 0,
        "isdel": 0,
        "orderCode": "",
        "payCallBackType": 0,
        "payCallBackURL": "",
        "promotionId": "2158",
        "promotionName": "测试抵扣券",
        "subOrderCode": "",
        "totalCouponPrice": "10",
        "type": 3,
        "update_at": 0,
        "update_by": ""
      }],
      "shouldPay": faker.random.number({ max: 300 }),
      "totalDiscountPrice": faker.random.number({ max: 300 }),
      "totalPrice": faker.random.number({ max: 300 }),
    },
    "message": "",
    "toast": ""
  }
};
