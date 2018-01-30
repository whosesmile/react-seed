// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        orderId: faker.random.number(),
        goodsId: faker.random.number(),
        // goodsType: faker.random.arrayElement(['TICKET', 'ENTITY', 'FLOW']),
        goodsType: faker.random.arrayElement(['ENTITY']),
        goodsName: faker.name.jobArea(),
        exchangeAt: new Date(faker.date.recent()).getTime(),
        consumeIntegral: faker.random.number(),
        marketPrice: faker.random.number(),
        number: faker.random.number(),
        orderCode: faker.random.number(),
        consigneeMobile: 18610535297,
        consigneeAddress: faker.address.streetAddress("###"),
        status: faker.random.number({ min: 4, max: 4 }),
        source: faker.random.number({ min: 2, max: 2 }),
        coverImg: faker.image.image(90, 90),
        logisticsCode: faker.random.number(),
        logisticsCompany: faker.address.city(),
      }
    },
  };
}
