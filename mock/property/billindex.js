// https://github.com/Marak/faker.js/wiki
/*
  我的账单
*/
var faker = require('faker')

var billsList = [];
for (var i = 0; i < 8; i++) {
  billsList.push({
    costName: "公摊水电费",
    custName: "",
    debtsAmount: "34.77(含违约金:7.2)",
    dueAmount: "34.77(含违约金:7.2)",
    feeDueDate: 1477929600000,
    feeDueDateStr: "",
    feeDueDateStrMonth: "11月",
    feeStatus: "未缴",
    lateFeeAmount: "7.2",
    projectName: "",
    waivAmount: "0.0"
  });
}

module.exports = function() {
  return {
    code: 200,
    data: {
      //不能缴费
      // baseToken: faker.random.number(),
      // bind: true,
      // canPayFee: 1,
      // discountAmount: 0.00,
      // list: [{
      //   billsList: billsList,
      //   year: "2017年"
      // }],
      // ownerInfos: [{
      //   mobile: "18600656670",
      //   name: "张三"
      // }],
      // recordCount: 0,
      // remindMsg: "房间[LC101-1-0102]业主不存在",
      // shouldPay: "1.00",
      // sumDebt: "3.22",
      // sumPrePay: "4.44",
      // tosat: "hahah",
      // totalCount: 100
      // 可以缴费
      baseToken: faker.random.number(),
      bind: true,
      canPayFee: 1,
      discountAmount: 0.00,
      list: [{
        billsList: billsList,
        year: "2017年"
      }],
      ownerInfos: [{
        mobile: "18600656670",
        name: "张三"
      }, {
        mobile: "18600656670",
        name: "王五"
      }],
      recordCount: 3,
      remindMsg: "",
      shouldPay: "307.38",
      sumDebt: "307.38",
      sumPrePay: "4.44",
      tosat: "",
      totalCount: 3
    }
  };
}
