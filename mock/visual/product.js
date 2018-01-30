// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      data: {
        businessNo: 'CS',
        categoryCode: 'LZ',
        figure: "https://img1.qdingnet.com/image-484f4081-d358-4a3d-bf9a-01dc825255bf.png",
        id: "44f79daf519311e78d7b44a8421ae0af",
        isShowServiceTime: 1,
        isSpecification: 1,
        pageType: 0,
        pageUrl: "",
        price: "1.00",
        priceRange: "",
        priceType: 0,
        productImg: ["https://img1.qdingnet.com/image-37e73979-b92c-4f2b-a2fc-e89af0051bea.png"],
        projectRanges: [{ projectId: "1789", projectName: "千丁互联" }, { projectId: "76", projectName: "北京好望山" }],
        serviceDetail: "<p>阿萨德发撒的发骄傲圣诞节疯狂老师的家乐福卡就是打开了房间啊速度离开房间啊身份卡就是打开啦就是的空间都是坑垃圾罚款来说</p>",
        serviceStandard: "的",
        serviceTime: "8点-20点",
        servictType: 0,
        showImg: [{ url: "https://img1.qdingnet.com/image-484f4081-d358-4a3d-bf9a-01dc825255bf.png" }],
        url: "https://img1.qdingnet.com/image-484f4081-d358-4a3d-bf9a-01dc825255bf.png",
        status: 1,
        subTitle: "订单",
        title: "虚拟券",
        unit: "元",
        wareId: 3510
      },
      project: {
        cityId: "23",
        cityName: "中陲",
        concats: [{ address: "千丁互联1", id: "249", phone: "40008700199", phones: ["40008700199", "40008700177", "40008700666"], postCode: "千丁互联", type: "1" }],
        distance: "",
        districtId: 2839,
        districtName: "测试中陲区1",
        groups: [{ groupCode: "1", groupName: "15" }, { groupCode: "2", groupName: "14" }],
        id: "1789",
        isDemo: 0,
        isRent: 1,
        name: "千丁互联",
        provinceId: 35,
        provinceName: "中陲省",
        streetInfo: "长楹天街"
      }
    },
  };
};
