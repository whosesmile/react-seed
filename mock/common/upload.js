// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "list": [{
        "name": "file",
        "path": "//img1.qdingnet.com/aa3ae9f3f12a7fa20d5b47aa3e120a90.jpg"
      }]
    },
  };
};
