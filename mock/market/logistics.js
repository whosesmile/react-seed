// 获取物流信息
var faker = require('faker')
module.exports = function() {
    return {
        code: 200,
        data: {
            entity: {
                orderCode: "MS21321321323434343",
                productImg: "https://img1.qdingnet.com/image-4ce6f4da-d5fa-467d-9892-87bf7472581a.png",
                deliveryName: "Nicon",
                deliveryMobile: "180*******",
                deliveryIcon: "https://img1.qdingnet.com/image-4ce6f4da-d5fa-467d-9892-87bf7472581a.png",
                outShopMobile: "0472-1010101",
                expressList: [{
                    desc: "[北京市] 已签收，感谢使用圆通，期待再次为您服务",
                    recordTime: 1508486226900,
                }, {
                    desc: "[北京市] 已签收，感谢使用圆通，期待再次为您服务",
                    recordTime: 1508486226900,
                }, {
                    desc: "[北京市] 已签收，感谢使用圆通，期待再次为您服务",
                    recordTime: 1508486226900,
                }, {
                    desc: "[北京市] 已签收，感谢使用圆通，期待再次为您服务",
                    recordTime: 1508486226900,
                }, ]
            },
            message: "没毛病",
            toast: "aaa",
        }
    };
}
