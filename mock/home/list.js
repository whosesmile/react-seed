// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

var list = [];
for (var i = 0; i < 20; i++) {
  list.push({
    id: faker.random.number(),
    name: faker.name.jobArea(),
  });
}

module.exports = {
  code: 200,
  data: {
    list: list,
  },
};
