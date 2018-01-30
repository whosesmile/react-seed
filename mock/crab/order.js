// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        orderCode: faker.random.number(),
        shouldPay: '0.00',
      }
    }
  };
}
