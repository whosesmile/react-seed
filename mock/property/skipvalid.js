// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var code = faker.random.arrayElement([200]);
  return {
    code: code,
    data: {
      entity: {
        activityUrl: '/travel/2',
        activityName: '活动名称'
      }
    },
  };
}
