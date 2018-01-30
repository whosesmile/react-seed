// https://github.com/Marak/faker.js/wiki
/*
  确认完成
*/
var faker = require('faker')

module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {

      },
      message: "确认完成"
    }
  };
}
