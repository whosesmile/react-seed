// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

var list = [];
for (var i = 0; i < 10; i++) {
  list.push({
    address: "哼哼哈哈",
    addressBusinessType: 0,
    addressStr: "四川省-成都市-北城星座-人民群众公园",
    areaId: 0,
    areaName: "朝阳",
    cityId: 5,
    cityName: "成都市",
    defaultFlag: i === 0 ? 1 : 0,
    gender: -1,
    groupAddress: "",
    groupId: "",
    groupName: "",
    id: faker.random.number(),
    isSetting: 1,
    memberId: faker.random.number(),
    mobile: faker.phone.phoneNumberFormat(),
    name: "杜拉拉",
    phone: 18610535297,
    postCode: faker.random.number(),
    projectId: faker.random.arrayElement([1725, 1789, faker.random.number()]),
    projectName: "北城星座",
    provinceId: faker.random.number(),
    provinceName: "四川省",
    roomId: faker.random.number(),
    roomName: '22-22',
    street: "东五环平房桥东南角京城梨园内",
    version: 2
  });
}
module.exports = {
  code: 200,
  data: {
    list: list
  },
};
