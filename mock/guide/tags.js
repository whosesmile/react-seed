// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

var list = [];
for (var i = 0; i < 20; i++) {
  list.push({
    "labelId": faker.random.number(),
    "labelName": faker.name.jobArea(),
    "starLevel": faker.random.arrayElement([1, 2, 3, 4, 5]),
  });
}

module.exports = {
  code: 200,
  data: {
    list: list,
  },
};
