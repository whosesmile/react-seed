// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "message": "",
      "orderInfoDto": {
        "carBrandId": "531f1f0a098e71b3f8000eac",
        "carBrandName": "奥迪(进口)",
        "carEngineNo": "",
        "carLicenseNo": "京",
        "carTypeName": "A1",
        "categoryId": "5923ae46ba535e19c3000025",
        "categoryName": "PM25空调滤套餐",
        "displaceName": "1.4T (30TFSI)",
        "memberAddress": "北京市长楹天街",
        "memberMobile": "18601966961",
        "memberName": "杜拉拉",
        "orderNo": "664950",
        "serviceList": [{
          "partList": [{
            "partBrand": "卡拉丁",
            "partId": "5552c5bcfee7347713002dc4",
            "partModel": "KD-722 抗菌防霉",
            "partNum": "",
            "partPrice": "12900.00",
            "partSize": "1.0",
            "partTotalPrice": faker.random.number(),
            "partType": "空调滤清器",
            "partUnit": ""
          }],
          "serviceId": "527781867ef560ccbc000007",
          "serviceName": "空调滤更换",
          "servicePrice": faker.random.number()
        }, {
          "partList": [],
          "serviceId": "52c186d4098e7133cd000005",
          "serviceName": "32项安全检测",
          "servicePrice": faker.random.number()
        }, {
          "partList": [],
          "serviceId": "563a2f1ac3666e47e7000001",
          "serviceName": "基础服务费",
          "servicePrice": faker.random.number()
        }],
        "skuId": 109356,
        "status": "0",
        "subscribeTime": "2017-06-17 08:00",
        "totalPrice": faker.random.number(),
        "wareId": 222678
      },
      "toast": ""
    }
  };
};
