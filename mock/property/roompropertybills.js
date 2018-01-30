// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() { //app缴费记录

  var list = [];
  for (var i = 0; i < 20; i++) {
    list.push({
      costName: "住宅物管费",
      custName: "瞿俊凯",
      debtsAmount: "211.63",
      dueAmount: "211.63",
      feeDueDate: 1477929600000,
      feeDueDateStr: "2016‐11‐01",
      feeDueDateStrMonth: "",
      feeStatus: "未缴",
      lateFeeAmount: "43.8",
      feeStartDate: "2017.5.2",
      feeEndDate: "2017.5.9",
      projectName: "",
      waivAmount: "0.0"
    });
  }

  return {
    code: 200,
    data: {
      baseToken: "v1_UU5LQm56KzdLYnJJZmR1QXhoV2t6Nkt4MUFpSGhyN2ZVSjVRV0c1YTNLN0l6Q3Bxc",
      list: list,
      message: "",
      paidPrice: 0.0,
      payStatus: "",
      timeSpan: "",
      toast: "",
      totalPrice: 307.38,
      unpaid: true,
      unpaidPrice: 307.38,
      ym: "2016年11月"
    }
  }
}
