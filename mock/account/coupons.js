// https://github.com/Marak/faker.js/wiki
var faker = require('faker');
let list = [];

for (let i = 0; i < 20; i++) {
  list.push({
    "batchName": "满99元减9元券",
    "code": faker.random.number(),
    "couponTemplateType": 0,
    "desc": "本券为9元满减券，商城购物满99元消费可用；使用期限至2017年10月31日",
    "endTime": 1509465599000,
    "isAllProject": 1,
    "isExclusive": 1,
    "note": "满99元减9元券",
    "price": faker.random.arrayElement([50, 10, 20, 5, 8]),
    "productNoNames": [
      "满99元减9元券"
    ],
    "startTime": 1509033600000,
    "status": faker.random.arrayElement([1, 2, 3]),
  });
}

module.exports = {
  "code": 200,
  "data": {
    "baseToken": "v1_UU5LQm56KzdLYm90TVBlWEc2UWhmaFV5N2g5Wmtlalp6SlVralBXRWlkRHFESk83WTJhKzkydGY0WjBrL3BUcGdJaFVLZUN2ckk0YVlYc0hZN0R5K1ozTWtMWHdKb2dEZnJVdktVbys1RkJaeVdlNStBbVlYZWlTMGJyci9xejVVdEN6NHZSWlNTMXVoRHVaVHRaM2pvb2RScDFSbC9YSTdiOUF6eXMxTEJObHROS3IrODNDT2JNZG1RUFpUS09SZkwwSWNyY0VmVmpzQkxIZlEzUzVPOGJzeWdTd1pqMGNDWVpoOW9ObWkrUUpaOHdmMWxCZGhrVEZnMXNPQ0toMzJEanZDUlhLczFHSkxiTGdvektXaHc9PRxv-cZz7fjdNGElrSduafh1VZYbWirOmzndd-YPhHCknoHphZdq1AVbTEnFGJGHsjbLSQjA-gse_Ikh_PK0h2-DnDQMw1-x1XQu447wwrh8YRQ4-SLNpotMEE-KUQEAVJMP9Yaob72urkTxB9N9T0HAt13swC0jmi0kIaioEoRo",
    "list": list,
    "message": "",
    "toast": "",
    "totalCount": 127,
    "unavailableCouponList": []
  }
};
