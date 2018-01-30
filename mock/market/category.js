// https://github.com/Marak/faker.js/wiki
var faker = require('faker');

// 菜单名称
const categries = ['蔬菜水果', '地方特产', '肉禽蛋奶', '粮油调味', '清洁日化', '休闲零食', '酒水茶饮', '方便速食', '家居户外', '礼品卡券', '其他分类', '莫名其妙'];

// 构建菜单
function makeMenu(level) {
  let menu = {
    id: faker.random.number(),
    outCategoryName: faker.random.arrayElement(categries),
    level: level,
  };
  if (level == 1) {
    menu.childList = [];
    for (let i = 0; i < 5; i++) {
      menu.childList.push(makeMenu(2));
    }

  }
  return menu;
}

let list = [];
for (let i = 0; i < 20; i++) {
  list.push(makeMenu(1));
}

module.exports = function() {
  return {
    code: 200,
    data: {
      "list": list,
      message: "没毛病",
      toast: "aaa",
    }
  };
}
