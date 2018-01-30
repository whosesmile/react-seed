// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "entity": {
        "contactMobile": "18600348973",
        "contactName": "趴趴熊",
        "createAt": "1488975051101",
        "orderCode": "TL13400011703082010508142",
        "contactAddress": "在地球上",
        "orderContactsList": [{
          "birthdate": 0,
          "cardNo": "231005",
          "cardType": "1",
          "contactsCardId": "",
          "expires": 0,
          "familyName": "",
          "givenName": "",
          "id": "1111",
          "memberId": "",
          "mobile": "",
          "name": "papi",
          "orderCode": "TL13400011703082010508142",
          "price": 490,
          "sex": "",
          "skuId": "8201",
          "skuPackageName": "儿童/2017-03-12/五星酒店/lalal",
          "specPeople": "儿童",
          "subOrderCode": "TL13400011703082010508142_2",
          "subOrderFlowNo": "TL_84600021703082010508762",
          "subOrderStatus": "101"
        }, {
          "birthdate": 0,
          "cardNo": "231005",
          "cardType": "1",
          "contactsCardId": "",
          "expires": 0,
          "familyName": "",
          "givenName": "",
          "id": "111",
          "memberId": "",
          "mobile": "",
          "name": "papi",
          "orderCode": "TL13400011703082010508142",
          "price": 280,
          "sex": "",
          "skuId": "8198",
          "skuPackageName": "成人/2017-03-12/五星酒店/lalal",
          "specPeople": "成人",
          "subOrderCode": "TL13400011703082010508142_1",
          "subOrderFlowNo": "TL_36500011703082010508762",
          "subOrderStatus": "101"
        }],
        "orderStatus": "5",
        "passengerDesc": "1位成人  1位儿童  ",
        "payTime": 0,
        "payType": 0,
        "productStartDate": 1489248000000,
        "specConf": "{\"220\":[\"448(split)五星酒店\"],\"-2\":[\"267(split)成人\",\"269(split)儿童\"],\"-1\":[\"1489248000000(split)2017-03-12\",\"1489852800000(split)2017-03-19\",\"1490457600000(split)2017-03-26\"]}",
        "title": "0308-2标题",
        "totalDiscountPrice": 330,
        "totalPrice": 1100,
        "totalRealPrice": 770,
        "passengerAck": 2,
        "ack": 1, //是否需要确认:0否, 1是
        "productType": 1, //商品类型:0实物货物，1电子凭证
        "ecode": "1111,2222,3333,4444",
        "logisticsName": "申通",
        "logisticsCode": "wlcode567890",
        "deliveryStatus": 101,
        "orderGrouponShowBean": { 
          "couponAmount": "0",
          "couponCodes": "[]",
          "couponCount": 0,
          "couponIds": "[]",
          "discount": "100.00",
          "grouponEndTime": 0,
          "grouponName": "旅游线路测试",
          "grouponPrice": "30.00",
          "grouponStatus": 1,
          "grouponStatusName": "未开团",
          "integralAmount": "0",
          "predepositAmount": "0",
          "status": 0,
          "statusName": ""
        }
      },
      "message": "订单详情查询成功",
      "toast": "",
      "totalCount": 0
    }
  };
}
