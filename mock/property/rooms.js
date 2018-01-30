// https://github.com/Marak/faker.js/wiki
/*
  app缴费记录
*/
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "list": [{
        "auditStatus": 1,
        "bindId": "",
        "hkIndentity": 1,
        "room": {
          "buildingId": "67652",
          "buildingName": "1栋",
          "deliverStatus": 1,
          "desc": "0101",
          "groupName": "静苑",
          "id": "514444",
          "mobiles": [],
          "name": "0101",
          "projectId": "62",
          "projectName": "水晶郦城",
          "roomAddr": "重庆市渝北区天宫殿街道龙湖·水晶郦城静苑-"
        },
        "validityEndAt": 0,
        "validityStartAt": 0
      }, {
        "auditStatus": 1,
        "bindId": "",
        "hkIndentity": 1,
        "room": {
          "buildingId": "67652",
          "buildingName": "1栋",
          "deliverStatus": 1,
          "desc": "0203",
          "groupName": "静苑",
          "id": "514449",
          "mobiles": [],
          "name": "0203",
          "projectId": "62",
          "projectName": "水晶郦城",
          "roomAddr": "重庆市渝北区天宫殿街道龙湖·水晶郦城静苑-"
        },
        "validityEndAt": 0,
        "validityStartAt": 0
      }],
      "message": "",
      "toast": ""
    }
  }
}
