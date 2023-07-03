const {sendTextMsg} = require("../sendMsg/send_msg")

function helpTalk(receiver, receive, type) {
    let str1 = `帮助：
    输入 DD添加对话：(输入对话)///(回复对话) 来添加新的对话（需要管理员权限）,输入 DD唱首歌 会被打扰,输入 动漫图片 来获取动漫图片`
     let str2 = `输入 天气 来获取天气信息,输入 百度百科：(搜索内容) 来百度,输入 DD开始在线卖萌 emmmm你可能需要输入 停下来 来停下它,输入 (数字)分钟后提醒我 来定时提醒。`
    sendTextMsg(type, receiver, str1);
    sendTextMsg(type, receiver, str2);
}

function isRun(receive){
    return receive == '请DD帮助我一下'
}

function run(receiver, receive, type){
    helpTalk(receiver, receive, type)
}

module.exports = {helpTalk,isRun,run}