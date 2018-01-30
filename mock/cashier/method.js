// https://github.com/Marak/faker.js/wiki
// 2.8新增 /api/json/brick/getRoomBygroupName
var faker = require('faker')
module.exports = function() {
  return {
    code: 200,
    data: {
      "combinationPayMainMethods": [],
      "message": "",
      "offlinePayMethods": [{
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 0,
        "desc": "需前往物业前台支付后才会发货",
        "icon": "//img1.qdingnet.com/7e3aaf5d709b1321b3a1a3513d045c4c.png",
        "name": "物业前台",
        "quotaAmount": "",
        "type": 111
      }],
      "onlinePayMethods": [{
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 0,
        "desc": "微信支付安全",
        "icon": "//img1.qdingnet.com/f307ad8707b0c23f67c504d5749cafb7.png",
        "name": "微信",
        "quotaAmount": "",
        "type": 51
      }, {
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 0,
        "desc": "推荐有支付宝账户的用户使用",
        "icon": "//img1.qdingnet.com/7e3aaf5d709b1321b3a1a3513d045c4c.png",
        "name": "支付宝",
        "quotaAmount": "",
        "type": 31
      }],
      "toast": "",
      "virtualPayMethods": [{
        "activity": "",
        "combinationShouldPay": "",
        "defaultFlag": 1,
        "desc": "钱包支付更快捷",
        "familyPayBean": [],
        "icon": "//img1.qdingnet.com/f307ad8707b0c23f67c504d5749cafb7.png",
        "name": "钱包",
        "quotaAmount": "",
        "type": 61,
        "value": "2.36"
      }],
      "walletStatus": {
        "status": 1,
        "statusTips": ""
      }
    }
  };
}
