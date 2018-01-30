// https://github.com/Marak/faker.js/wiki
/*
  app缴费记录
*/
var faker = require('faker')
module.exports = function() {
    return {
        code: 200,
        data: {
            baseToken: "v1_UU5LQm56KzdLYnJJZmR1QXhoV2t6Nkt4MUFpSGhyN2ZVSjVRV0c1YTNLN0l6Q3Bxc",
            bind: true,
            canPayFee: 1,
            list: [{
                "createAt": "1477367236465",
                "id": "2c90e46a57f9eb100157f9f308ac0001",
                "orderCode": "WF03800011610251147164262",
                "payStatus": "101",
                "timeSpan": "2016年10月至2016年12月",
                "totalDiscount": "45.67",
                "totalPrice": "456.78",
                "totalRealpay": "411.11"
            }, {
                "createAt": "1477366907831",
                "id": "2c90e46a57f9eb100157f9ee04b00000",
                "orderCode": "WF03800011610251141477272",
                "payStatus": "105",
                "timeSpan": "2016年10月至2016年11月",
                "totalDiscount": "0.00",
                "totalPrice": "324.52",
                "totalRealpay": "324.52"
            }, {
                "createAt": "1477362956003",
                "id": "2c90e44c57f5caae0157f9b1b8210000",
                "orderCode": "WF03800011610251035559562",
                "payStatus": "105",
                "timeSpan": "2016年10月至2016年12月",
                "totalDiscount": "4.60",
                "totalPrice": "46.00",
                "totalRealpay": "41.40"
            }, {
                "createAt": "1476937790315",
                "id": "2c90e4f757dc00570157e05a37cf0000",
                "orderCode": "WF03800011610201229502752",
                "payStatus": "105",
                "timeSpan": "2016年10月至2016年10月",
                "totalDiscount": "0.00",
                "totalPrice": "0.01",
                "totalRealpay": "0.01"
            }, {
                "createAt": "1470108661945",
                "id": "2c90e4865648fe6c0156494df9c60002",
                "orderCode": "WF03800011608021131018442",
                "payStatus": "105",
                "timeSpan": "2016年08月至2016年08月",
                "totalDiscount": "0.00",
                "totalPrice": "0.02",
                "totalRealpay": "0.02"
            }, {
                "createAt": "1470108612651",
                "id": "2c90e4865648fe6c0156494d38790001",
                "orderCode": "WF03800011608021130074332",
                "payStatus": "105",
                "timeSpan": "2016年08月至2016年08月",
                "totalDiscount": "0.00",
                "totalPrice": "0.01",
                "totalRealpay": "0.01"
            }, {
                "createAt": "1470108570933",
                "id": "2c90e4865648fe6c0156494c96260000",
                "orderCode": "WF03800011608021129308872",
                "payStatus": "105",
                "timeSpan": "2016年08月至2016年08月",
                "totalDiscount": "0.00",
                "totalPrice": "0.01",
                "totalRealpay": "0.01"
            }, {
                "createAt": "1470036293993",
                "id": "2c90e45e56304f0b015644fdb9c60005",
                "orderCode": "WF03800011608011524539482",
                "payStatus": "105",
                "timeSpan": "2016年07月至2016年08月",
                "totalDiscount": "0.00",
                "totalPrice": "150.01",
                "totalRealpay": "150.01"
            }],
            message: "",
            remindMsg: "您还有未完成的缴费订单，请首先在【APP缴费记录】取消后继续缴费。",
            toast: "",
            totalCount: 1
        }
    }
}
