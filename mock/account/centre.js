// https://github.com/Marak/faker.js/wiki
// 2.8新增 /api/json/brick/getRoomBygroupName
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      entity: {
        hasGift: 1, // 显示礼包0 || 1
        showRemind: 1, // 显示红点0 || 1
      },
      taskList: [{
        "activityImg": "//img1.qdingnet.com/2dcc8b54639311c7613cffe458b81d7c.jpg",
        "title": "夏天到了，看看这神奇的自然！",
        "isNew": 0,
        "skipModel": "{\"entity\":{\"route\":0,\"skno\":7000,\"pcode\":0,\"source\":\"api\",\"url\":\"http://baidu.com\",\"id\":\"000000\"}}",
      }]
    },
  };
};
