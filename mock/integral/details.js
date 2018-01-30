// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        id: faker.random.number(),
        goodsName: faker.name.jobArea(),
        goodsType: faker.random.arrayElement(['ENTITY' /*, 'TICKET'*/ ]),
        goodsDesc: faker.lorem.words().split(' ').join('\n'),
        consumeIntegral: faker.random.number(),
        marketPrice: faker.random.number(),
        detail: "\u003cp\u003e配送方式：快递配送\u003c/p\u003e\n\u003cp\u003e购物咨询：请联系本地社区服务中心，或拨打千丁客服咨询热线4000818181\u003c/p\u003e\n\u003cp\u003e产品介绍：乐扣一键式真空保温杯，500ml大容量，足够你喝。\u003c/p\u003e\n\u003cp\u003e\u003cimg src\u003d\"https://img1.qdingnet.com/image-33a9953c-131b-4cd1-957f-4a2f966a4718.jpg\" alt\u003d\"\" /\u003e\u003cimg src\u003d\"https://img1.qdingnet.com/image-1a946926-deeb-47df-995c-441fc1215d91.jpg\" alt\u003d\"\" /\u003e\u003cimg src\u003d\"https://img1.qdingnet.com/image-39ca8352-af60-4011-9a3d-16f3fc5450f3.jpg\" alt\u003d\"\" /\u003e\u003cimg src\u003d\"https://img1.qdingnet.com/image-9b303808-767d-43c5-9b05-a24d2820cf0a.jpg\" alt\u003d\"\" /\u003e\u003cimg src\u003d\"https://img1.qdingnet.com/image-b10f6a98-5d03-4bb7-91be-e615b3725c76.jpg\" alt\u003d\"\" /\u003e\u003c/p\u003e",
        imageSrcList: [
          '//img1.qdingnet.com/image-fcd8acf3-6d36-4028-abd0-1cd594ce3026.jpg?imageView2/1/w/750/h/700',
          '//img1.qdingnet.com/image-3420faf7-1649-4789-aa0e-921d71af2356.jpg?imageView2/1/w/750/h/700',
          '//img1.qdingnet.com/image-2a31582b-cd2c-4d87-b721-247b26c08047.jpg?imageView2/1/w/750/h/700',
          '//img1.qdingnet.com/image-8766743d-e356-4ce3-a0a1-f4a9e1390638.jpg?imageView2/1/w/750/h/700',
        ]
      }
    },
  };
};
