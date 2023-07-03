
const axios = require('axios')
const {sendVoiceMsg,sendMsg} = require("../sendMsg/send_msg")//引入所需模块

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return receive == 'DD唱首歌'
}

function run(receiver, receive, type,appSql){//入口方法
    sendVoiceMsg(type, receiver, '哎咿呀咦哟，嘿嘿');
        axios.get(encodeURI('https://api.uomg.com/api/rand.music?sort=热歌榜&format=json')).then(res => {
            sendMsg(type, receiver, res.data.data.url,appSql);
        });
}

module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法