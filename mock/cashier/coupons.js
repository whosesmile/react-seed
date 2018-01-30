// https://github.com/Marak/faker.js/wiki
// 2.8新增 /api/json/brick/getRoomBygroupName
var faker = require('faker')

module.exports = {
  code: 200,
  data: {
    "expiring": 0,
    "common": Array(3).fill(1).map(i => generateCoupon()),
    "unavailable": Array(3).fill(1).map(i => generateCoupon()),
  }
};

function generateCoupon() {
  return {
    "batchId": "",
    "batchName": faker.name.jobArea(),
    "code": faker.random.number(),
    "couponTemplateType": 0,
    "desc": "",
    "endTime": new Date(faker.date.recent()).getTime(),
    "isAllProject": 1,
    "isExclusive": 1,
    "note": "抵扣2",
    "price": faker.random.arrayElement([1, 5, 10, 15, 20, 25, 30]),
    "productNoNames": [
      faker.name.jobArea(),
    ],
    "projectName": [],
    "skipModel": "{\"entity\":{\"route\":0,\"skno\":7000,\"pcode\":0,\"source\":\"api\",\"url\":\"https://qam.iqdnet.com/account/coupon/1181057740453\",\"id\":\"000000\"}}",
    "startTime": new Date(faker.date.recent()).getTime(),
    "status": 1,
    "templateType": 4
  }
}
