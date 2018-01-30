// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
    return {
        "code": 200,
        "data": {
            "message": "success",
            "entity": {
                "nameFlag": 1,
                "nameChangeFlag": 1,
                "mobileFlag": 1,
                "mobileChangeFlag": 1,
                "mobileCheckFlag": 0,
                "addressFlag": 1,
                "addressChangeFlag": 1,
                "extOneFlag": 0,
                "extOne": {
                    "label": "自定义1",
                    "type": "1",
                    "required": 1
                },
                "extTwoFlag": 0,
                "extTwo": {
                    "label": "自定义2",
                    "type": "2",
                    "required": 1,
                    "items": "11,22",
                    "itemList": ["11", "22"]
                },
                "extThreeFlag": 0,
                "extThree": {
                    "label": "自定义3",
                    "type": "1",
                    "required": 1
                },
                "applyStageReqList": [{
                    "stageId": 142,
                    "applyId": 63,
                    "name": "场次一",
                    "startTime": 1501830600000,
                    "endTime": 1503024600000,
                    "stagePerson": 2,
                    "stageTotal": 3
                }, {
                    "stageId": 143,
                    "applyId": 64,
                    "name": "场次33",
                    "startTime": 1501830600000,
                    "endTime": 1503024600000,
                    "stagePerson": 5,
                    "stageTotal": 3
                }]
            }
        }
    }
}
