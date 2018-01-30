// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        availableTime: 1497600000000,
        excludeTimes: [1497628800000, 1497715200000],
        timee: 20,
        times: 8
      }
    },
  };
};
