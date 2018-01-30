// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      "id": "ea04f44b5aee11e7b9bb1866da8c77bf", // id
      "title": "美林湾精装大三居，南北通透，观潮白河",
      "jushi": "1室1厅1卫", // 户型、居室
      "showImg": '',
      "orientationName": "西", // 朝向
      "projectName": "好望山", // 社区名
      "rentalName": faker.random.arrayElement(['租', '售']), // 租赁类型
      "rentalPrice": `${faker.random.number()}元/月`, // 月租金
      "totalArea": "99.8", // 总面积
      "totalPrice": `${faker.random.number()}万元`, //总价
      "houseTag": "满两年,随时看房,紧邻公交", // 标签
      "shi": 1, // 室
      "ting": 1, // 厅
      "wei": 1 // 卫
    });
  }
  return {
    code: 200,
    data: {
      list: list,
    }
  };
}
