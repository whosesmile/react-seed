// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

var list = [];
for (var i = 0; i < 3; i++) {
  list.push({
    "url": "https://www.baidu.com",
    // "bigPic": "https://img1.qdingnet.com/image-20f45a14-3904-42c2-9b1f-7548b6e828c0.png",
    "bigPic": "//img1.qdingnet.com/image-55e8c3bd-7313-492d-b0c8-f7f61d703ffd.jpg?imageView2/2/w/750/h/375",
    "showPosition": 4
  });
}

module.exports = function() {
  return {
    "code": 200,
    "data": {
      "list": list
    }
  };
};
