// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
    return {
        code: 200,

        // "data": {
        //   "list": [],
        //   "message": "查询成功"
        // }

        "data": {
            "list": [{
                "specDate": 1493697538111, //日期规格
                "sellPrice": 699 //销售价格
            }, {
                "specDate": 1493798538111, //日期规格
                "sellPrice": 199 //销售价格
            }, {
                "specDate": 1494707538111, //日期规格
                "sellPrice": 199 //销售价格
            }, {
                "specDate": 1496697538111, //日期规格
                "sellPrice": 199 //销售价格
            }, {
                "specDate": 1510707538111, //日期规格
                "sellPrice": 199 //销售价格
            }, {
                "specDate": 1520707538111, //日期规格
                "sellPrice": 199 //销售价格
            }, {
                "specDate": 1530707538111, //日期规格
                "sellPrice": 199 //销售价格
            }],
            "message": "查询成功"
        }
    };
}
