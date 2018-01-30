// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        account: {
          availableAmount: '109.399',
          depositAmount: faker.random.number(),
          expenditureAmount: faker.random.number(),
        },
        accountIntegral: faker.random.number(),
        accountQdTicket: faker.random.number(),
        memberId: faker.random.number(),
        slogan: [],
        sloganDetail: '预存款不能缴水、 电、 燃气费用； 账户充值上限为4999元',
        walletStatus: {
          status: 1,
          statusTips: ""
        }
      }
    },
  };
}
