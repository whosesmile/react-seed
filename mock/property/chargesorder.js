// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var code = faker.random.arrayElement([200, 500]);
  return {
    code: code,
    data: {
      entity: {
        orderCode: faker.random.number(),
        totalPrice: faker.random.number(),
        type: 'WF',
      },
      message: '此房间的物业费用已经结清',
    },
  };
}
