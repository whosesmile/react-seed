// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

var list = [];
for (var i = 0; i < 2; i++) {
  list.push({
    id: faker.random.number(),
    packageName: faker.name.jobArea(),
    packageNumber: faker.random.number(),
  });
}

module.exports = {
  code: 200,
  data: {
    list: list,
  },
};
