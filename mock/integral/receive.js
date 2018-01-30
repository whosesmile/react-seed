// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var code = faker.random.arrayElement([200, 500]);
  return {
    code: code,
    data: {
      message: code === 200 ? '您已经签收成功啦！' : '一不小心失败了',
    },
  };
}
