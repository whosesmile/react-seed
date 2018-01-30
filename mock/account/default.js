// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = {
  code: faker.random.arrayElement([200, 500]),
  data: {
    message: "设置默认收货地址失败"
  },
};
