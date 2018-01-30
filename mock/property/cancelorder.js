// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var code = faker.random.arrayElement([200]);
  return {
    code: code,
    data: {
      message: 'success',
    },
  };
}
