// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity:{
        orderStatus:0,
        orderStatusName:"退货成功",
      },
      message:"商品详情查询成功",
      toast:"vvv",
    },
  };
};
