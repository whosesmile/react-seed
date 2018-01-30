// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    "data": {
      "list": [
        { "id": "345", "name": "签证", "code": "TS" }, //id品类,name品类名称，code系统
        { "id": "867", "name": "国内游", "code": "TL" },
        { "id": "868", "name": "国外游", "code": "TL" },
        { "id": "869", "name": "门票", "code": "TS" },
        { "id": "870", "name": "门票1", "code": "TS" },
        { "id": "871", "name": "门票2", "code": "TS" },
        { "id": "872", "name": "门票3", "code": "TS" }
      ],
      "totalCount": 4,
      "message": "查询成功"

    }
  };
}
