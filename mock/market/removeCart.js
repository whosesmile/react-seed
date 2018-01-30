// 添加购物车
var faker = require('faker')
module.exports = function() {
    return {
        code: 200,
        data: {
            "list": [{
                "skuId": "001",
                "id": "YH211021021010201",
                "img": "https://img1.qdingnet.com/image-4ce6f4da-d5fa-467d-9892-87bf7472581a.png",
                "title": "草莓袋-氰化钾",
                "skuName": "袋装",
                "outSkuTotalPrice": 100000,
                "num": 23,
                "status": 1,
                "outSkuTotalPriceSum": 199,
            }, {
                "skuId": "002",
                "id": "YH211021021010202",
                "img": "https://img1.qdingnet.com/image-4ce6f4da-d5fa-467d-9892-87bf7472581a.png",
                "title": "草莓袋-氰化钾",
                "skuName": "袋装",
                "outSkuTotalPrice": 100000,
                "num": 21,
                "status": 1,
                "outSkuTotalPriceSum": 199,
            }, {
                "id": "003",
                "skuId": "YH211021021010203",
                "img": "https://img1.qdingnet.com/image-4ce6f4da-d5fa-467d-9892-87bf7472581a.png",
                "title": "草莓袋-氰化钾",
                "skuName": "袋装",
                "outSkuTotalPrice": 100000,
                "num": 21,
                "status": 1,
                "outSkuTotalPriceSum": 199,
            }, {
                "id": "004",
                "skuId": "YH211021021010205",
                "img": "https://img1.qdingnet.com/image-4ce6f4da-d5fa-467d-9892-87bf7472581a.png",
                "title": "草莓袋-氰化钾",
                "skuName": "袋装",
                "outSkuTotalPrice": 100000,
                "num": 21,
                "status": 0,
                "outSkuTotalPriceSum": 199,
            }],
            message: "没毛病",
            toast: "aaa",
        }
    };
}
