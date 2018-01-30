// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {

  return {
    code: 200,
    "data": {
      "list": [{
        "cardList": [{
          "birthdate": 1490977000000,
          "cardNo": "231005200903240518",
          "cardType": "1",
          "expires": 1490978000000,
          "familyName": faker.name.firstName(),
          "givenName": faker.name.lastName(),
          "memberContactsId": "22221122229",
          "memberId": faker.random.number(),
          "mobile": "18600000001",
          "name": "儿童（名字2）",
          "sex": faker.random.arrayElement(["0", "1"]),
          "id": "sf00004et"
        }],
        "contacts": {
          "id": "22221122229",
          "mobile": "18600000001",
          "name": "儿童（名字2）",
        }
      }, {
        "cardList": [{
          "birthdate": 1490976000000,
          "cardNo": "231005198903240518",
          "cardType": "1",
          "expires": 1490976000000,
          "familyName": faker.name.firstName(),
          "givenName": faker.name.lastName(),
          "memberContactsId": "2222222222",
          "memberId": faker.random.number(),
          "mobile": "18600000000",
          "name": "成人（名字）",
          "sex": faker.random.arrayElement(["0", "1"]),
          "id": "sf00001cr"
        }, {
          "birthdate": 1490976000000,
          "cardNo": "E88990088",
          "cardType": "3",
          "expires": 1490976000000,
          "familyName": faker.name.firstName(),
          "givenName": faker.name.lastName(),
          "memberContactsId": "2222222222",
          "memberId": faker.random.number(),
          "mobile": "18600000000",
          "name": faker.name.firstName(),
          "sex": faker.random.arrayElement(["0", "1"]),
          "id": "hz00001"
        }],
        "contacts": {
          "id": "2222222222",
          "mobile": "15001300532",
          "name": "成人（名字）",
        }
      }, {
        "cardList": [{
          "birthdate": 1490977000000,
          "cardNo": "231005198903240517",
          "cardType": "1",
          "expires": 1490978000000,
          "familyName": faker.name.firstName(),
          "givenName": faker.name.lastName(),
          "memberContactsId": "2222222223",
          "memberId": faker.random.number(),
          "mobile": "18600000001",
          "name": "成人（名字）",
          "sex": faker.random.arrayElement(["0", "1"]),
          "id": "sf00002cr"
        }],
        "contacts": {
          "id": "2222222223",
          "mobile": "18600000001",
          "name": "成人（名字）",
        }
      }, {
        "cardList": [{
          "birthdate": 1490977000000,
          "cardNo": "231005200903240518",
          "cardType": "1",
          "expires": 1490978000000,
          "familyName": faker.name.firstName(),
          "givenName": faker.name.lastName(),
          "memberContactsId": "22221122223",
          "memberId": faker.random.number(),
          "mobile": "18600000001",
          "name": "儿童（名字）",
          "sex": faker.random.arrayElement(["0", "1"]),
          "id": "sf00003et"
        }],
        "contacts": {
          "id": "22221122223",
          "mobile": "18600000001",
          "name": "儿童（名字）",
        }
      }],
      "message": "查询成功",
      "toast": "",
      "totalCount": 6
    }
  };

  // //测试分页用
  // var list = [];
  // for (var i = 0; i < 20; i++) {
  //   var tmpId = faker.random.number();
  //   list.push({
  //     "cardList": [{
  //       "birthdate": 1490976000000,
  //       "cardNo": "231005197777777777",
  //       "cardType": "1",
  //       "expires": 1490976000000,
  //       "familyName": faker.name.firstName(),
  //       "givenName": faker.name.lastName(),
  //       "memberContactsId": tmpId,
  //       "memberId": faker.random.number(),
  //       "mobile": "18600000000",
  //       "name": faker.name.firstName(),
  //       "sex": faker.random.arrayElement(["0", "1"]),
  //       "id": faker.random.number()
  //     }, {
  //       "birthdate": 1490976000000,
  //       "cardNo": "E88990088",
  //       "cardType": "3",
  //       "expires": 1490976000000,
  //       "familyName": faker.name.firstName(),
  //       "givenName": faker.name.lastName(),
  //       "memberContactsId": tmpId,
  //       "memberId": faker.random.number(),
  //       "mobile": "18600000000",
  //       "name": faker.name.firstName(),
  //       "sex": faker.random.arrayElement(["0", "1"]),
  //       "id": faker.random.number()
  //     }],
  //     "contacts": {
  //       "id": tmpId,
  //       "mobile": "15001300532",
  //       "name": faker.name.firstName(),
  //     }

  //   });
  // }
  // return {
  //   code: 200,
  //   data: {
  //     list: list
  //   },
  // };

}
