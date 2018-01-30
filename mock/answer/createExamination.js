// https://github.com/Marak/faker.js/wiki
var faker = require('faker')
module.exports = function() {
    return {
        "code": 200,
        "data": {
            "message": "success",
            "entity": {
                "examinationId": 226,
                "activityId": 453,
                "examinationSubjectResList": [{
                    "id": 706,
                    "content": "题目1",
                    "subjectOptionRspList": [{
                        "id": 438,
                        "code": "D",
                        "content": "答案4"
                    }, {
                        "id": 437,
                        "code": "C",
                        "content": "答案3"
                    }, {
                        "id": 436,
                        "code": "B",
                        "content": "答案2"
                    }, {
                        "id": 435,
                        "code": "A",
                        "content": "答案1"
                    }],
                    "type": 1,
                    "answerId": 435
                }, {
                    "id": 705,
                    "content": "题目2",
                    "subjectOptionRspList": [{
                        "id": 442,
                        "code": "D",
                        "content": "答案44"
                    }, {
                        "id": 441,
                        "code": "C",
                        "content": "答案33"
                    }, {
                        "id": 440,
                        "code": "B",
                        "content": "答案22"
                    }, {
                        "id": 439,
                        "code": "A",
                        "content": "答案11"
                    }],
                    "type": 1,
                    "answerId": 441
                }]
            }
        }
    }
}
