// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

module.exports = {
  code: 200,
  data: {
    id: faker.random.number(),
  },
};
