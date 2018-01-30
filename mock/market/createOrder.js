// 创建订单
var faker = require('faker')
module.exports = function() {
    return {
        code: 200,
        data: {
            entity: {
                orderCode: "MS21321321323434343",
                totalShouldPrice: "1000000",
            },
            message: "没毛病",
            toast: "aaa",
        }
    };
}
