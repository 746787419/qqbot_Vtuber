/* 模块send_msg中有三个方法分别为
    sendMsg(type, receiver, message, appSql) 发送消息
    sendTextMsg(type, receiver, message) 发送文字消息
    sendVoiceMsg(type, receiver, message) 发送语音消息
    type: group 或 private 要发送给群或私聊
    receiver: 接收消息的qq群或私聊号码
    message：消息内容
    appSql: appSql实例 来自app.js
    */
const axios = require("axios")
const {botUrl} = require("../appConfig/server_config")

async function sendMsg(type, receiver, message, appSql) {
    let reItem = await appSql.sqlQuery("receiver","receiver_id",receiver)
    switch (reItem[0].send_type) {
        case "text":
            sendTextMsg(type, receiver, message)
            break;
        case "tts":
            sendVoiceMsg(type, receiver, message)
            break;
    }
}

function sendTextMsg(type, receiver, message) {
    axios.post(botUrl + '/send_msg', { message_type: type, user_id: receiver, group_id: receiver, message: message });
}

function sendVoiceMsg(type, receiver, message) {
    axios.post(botUrl + '/send_msg', { message_type: type, user_id: receiver, group_id: receiver, message: `[CQ:tts,text=${message}]` });
}

function sendGroupPrivateTextMsg( receiver, message,group_id){
    axios.post(botUrl + '/send_private_msg', { auto_escape: "false", user_id: receiver, group_id: group_id, message: message });
}

module.exports = {sendMsg,sendTextMsg,sendVoiceMsg,sendGroupPrivateTextMsg}