// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
  return {
    "code": 200,
    "data": {
      "list": [{
        id: 98989,
        name: '小保养',
        desc: '为发动机提供定期所需的清洁和润滑',
        thumb: '//img1.qdingnet.com/c68e43e046aa73a10916df233615ca9e.png',
        image: '//img1.qdingnet.com/310c86fb618054ff7b6dd064ecf3d1ef.jpg',
        price: '298-1498',
        // promotion: '满200减68',
      }, {
        id: 98989,
        name: '机油三滤',
        desc: '发动机清洁与润滑，使车内空气清新',
        thumb: '//img1.qdingnet.com/ac904d0e1c6a74dcdcdd7ac416121974.png',
        image: '//img1.qdingnet.com/45dfb7887a5a0002f9a43bbf7280f527.jpg',
        price: '398-1898',
        // promotion: '满200减68',
      }, {
        id: 98989,
        name: 'PM2.5防霾滤芯',
        desc: '保持车内空气清新，防雾霾效果',
        thumb: '//img1.qdingnet.com/9ed33d1c638ad8796d3057b13ed1c082.png',
        image: '//img1.qdingnet.com/943d90d72e23ac758b6304318bb48e0a.jpg',
        price: '79-289',
        // promotion: '满200减68',
      }, {
        id: 98989,
        name: '可视化风道清洗',
        desc: '通风管路，除尘、祛味、防霾',
        thumb: '//img1.qdingnet.com/e28f77c17e4299d1450c2038bbe282a3.png',
        image: '//img1.qdingnet.com/da2b094b410a24d8f5581e7250e3c89e.jpg',
        price: '238－288',
        // promotion: '满200减68',
      }, {
        id: 98989,
        name: '刹车片养护',
        desc: '制动性能保障',
        thumb: '//img1.qdingnet.com/7fc68f1f3544854f65c4e198d14767ee.png',
        image: '//img1.qdingnet.com/227f04abe5411b615470d4773dedc3e7.jpg',
        price: '399-1699',
        // promotion: '满200减68',
      }]
    }
  };
};
