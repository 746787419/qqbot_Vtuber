//api模块写法演示
const {sendVoiceMsg} = require("../sendMsg/send_msg")//引入所需模块

function testTalk(receiver, receive, type) { //逻辑方法
    sendVoiceMsg(type, receiver, '欸呀呀呀，你要试试我的哪里呢？');
}

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return receive == '测试一下'
}

function run(receiver, receive, type){//入口方法
    testTalk(receiver, receive, type)
}

module.exports = {testTalk,isRun,run}//暴露的方法，必须暴露入口方法和条件方法