// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {

  var list = [];
  for (var i = 0; i < 10; i++) {
    list.push({
      "amounts": faker.random.arrayElement([5, 10, 20, 50, 100]),
      "desc": "午安误解",
      "explain": "大漠孤烟直　\n长河落日圆　\n三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切。怒发冲冠凭栏望，待从头，收拾旧河山。\n鸟宿池边树，僧敲月下门",
      "receiveAfter": 0,
      "receivePeriod": 7,
      "rule": faker.random.arrayElement([5, 10, 20, 50, 100]) + "元券",
      "status": faker.random.arrayElement([0, 1, 3]),
      "validEndTime": 1512143999000,
      "validStartTime": 1489593600000
    });
  }
  return {
    code: 200,
    data: {
      "list": list,
    }
  };
};
