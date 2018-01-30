// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var code = faker.random.arrayElement([200, 500]);
  return {
    code: code,
    data: {
      message: code === 200 ? '兑换成功' : '兑换失败',
      entity: {
        orderCode: faker.random.number(),
      }
    },
  };
}
