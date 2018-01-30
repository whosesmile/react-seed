// https://github.com/Marak/faker.js/wiki
var faker = require('faker')

module.exports = {
  code: 200,
  data: {
    packageNoticeDetail: {
      packageNotice: {
        id: faker.random.number(),
        packageName: faker.name.jobArea(),
        packageNumber: faker.random.number(),
      },
      recipientsName: '莫文蔚',
      recipientsMobile: '18610535297',
      projectId: faker.random.number(),
      cityName: '北京',
      projectName: '长楹天街住宅',
      address: '北京市朝阳区常营长楹天街未来时写字楼4层 千丁互联',
      roomNames: ['北京市-长楹天街住宅-3组团-9栋-1单元102', '北京市-长楹天街住宅-3组团-9栋-1单元103'],
    }
  },
};
