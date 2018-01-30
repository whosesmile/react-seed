// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "list": [{
        "businessName": "阶梯团购",
        "businessType": "TG"
      }, {
        "businessName": "专业清洁",
        "businessType": "QB"
      }, {
        "businessName": "分享团购",
        "businessType": "SG"
      }, {
        "businessName": "旅游",
        "businessType": "LY"
      }, {
        "businessName": "洗衣",
        "businessType": "XY"
      }, {
        "businessName": "通用业态",
        "businessType": "CB"
      }, {
        "businessName": "洗车",
        "businessType": "XC"
      }, {
        "businessName": "商城",
        "businessType": "NG"
      }, {
        "businessName": "绿植鲜花",
        "businessType": "HX"
      }, {
        "businessName": "手机维修",
        "businessType": "SW"
      }, {
        "businessName": "千丁萌宠",
        "businessType": "MC"
      }, {
        "businessName": "保洁",
        "businessType": "BJ"
      }, {
        "businessName": "洗车次卡",
        "businessType": "CK"
      }],
    }
  }
};
