// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      "houseId": "569b2ffa8df1292be053fa0aa8c0040a",
      "firstImgUrl": "https://image1.jyall.com/v1/tfs/T1wxWjByAT1RXrhCrK.jpg",
      "buyOrRent": 1,
      "houseTitle": "房源标题",
      "projectName": "唐宁ONE",
      "room": 0,
      "hall": 0,
      "toilet": 0,
      "balcony": 0,
      "constructionArea": 353.04,
      "price": "1000.00万元",
      "toward": 9,
      "isOnly": 0,
      "isFiveYears": 1,
      "isNew": 0,
      "developerTime": "2017-08-17 16:34:58"
    });
  }
  return {
    code: 200,
    data: {
      "list": list, //< houseSimpleDtoList > , //[出售房源列表]
      "userSimpleDto": {}, //[推荐经纪人信息]
      "pageNo": 0,
      "pageSize": 0,
      "qdpCode": 0, //仅用于验证用户是否存在
      "toalCount": 0,
      "toast": "string" //请求成功返回消息，可返回空字符串
    },
    "message": "string", //异常信息
  };
}

// { "code": 200, "data": { "list": [{ "houseId": "569b2ffa8df1292be053fa0aa8c0040a", "firstImgUrl": "https://image1.jyall.com/v1/tfs/T1wxWjByAT1RXrhCrK.jpg", "buyOrRent": 1, "houseTitle": "房源标题", "projectName": "唐宁ONE", "room": 0, "hall": 0, "toilet": 0, "balcony": 0, "constructionArea": 353.04, "price": "1000.00万元", "toward": 9, "isOnly": 0, "isFiveYears": 2, "isNew": 0, "developerTime": "2017-08-17 16:34:58" }, { "houseId": "97f98e9f65654fc18c0f3ccd55f98acb", "firstImgUrl": "https://image1.jyall.com/v1/tfs/T1wxWjByAT1RXrhCrK.jpg", "buyOrRent": 1, "houseTitle": "房源标题", "projectName": "唐宁ONE(0626)系统", "room": 0, "hall": 0, "toilet": 0, "balcony": 0, "constructionArea": 134, "price": "20000.00万元", "toward": 3, "isOnly": 0, "isFiveYears": 1, "isNew": 0, "developerTime": "2017-08-17 11:30:06" }, { "houseId": "f959a8b46aeb4610b28fd3d83343cc8b", "firstImgUrl": "https://image1.jyall.com/v1/tfs/T1wxWjByAT1RXrhCrK.jpg", "buyOrRent": 1, "houseTitle": "房源标题", "projectName": "唐宁ONE(0626)系统", "room": 3, "hall": 2, "toilet": 2, "balcony": 2, "constructionArea": 177, "price": "2300.00万元", "toward": 5, "isOnly": 1, "isFiveYears": 1, "isNew": 0, "developerTime": null }], "toalCount": 4, "pageSize": null, "pageNo": 1, "qdpCode": 200, "toast": "", "response": "" } }
