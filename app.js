//基于cqhttp的qq机器人

const express = require('express');
const cors = require('cors')
const sd = require('silly-datetime');
let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');

let config = require('./appConfig/server_config')

const appSql = require('./tool/appSql')//数据库
appSql.initPool()
const {sendTextMsg,sendVoiceMsg} = require('./sendMsg/send_msg')//发送消息
const {saveTalkHistory} = require('./tool/util')//存历史记录
// const {sourceMsg} = require('./sendMsg/source_msg')//自动发送消息
const {kaibo}=require('./autoSendToXxy/kaibo')

const {dongtai} = require('./autoSendToXxy/dongtai')

const appModules = require('./appConfig/modules_config')//回复处理模块
const talk_history_router = require('./web/talk_history')
let server = express();

server.listen(config.SERVER_url);
server.use(express.json()); //cqhttp反向http请求为json
// sourceMsg(6,appSql);//不定时发送消息
server.use(cors())
server.use(talk_history_router)
kaibo(appSql)
dongtai(appSql)
server.post('/', (req, res) => {
        UpDataState(req.body);
        res.send();
 });

async function UpDataState(data) {
    time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    //判断上报类型
    switch (data.post_type) {
        case 'message':
            console.log('(message)' +await receiveMsg(data)+"   时间:"+time);
            break;
        case 'request':
            console.log('(request)');
            break;
        case 'notice':
            console.log('(notice)');
            break;
    }
}

async function receiveMsg(data) {
    //判断消息类型 自己发送的消息不处理
    if (data.self_id == data.message_id) return '机器人发送的消息，不予处理';
    if (data.message_type == 'group') return receiveGroupMsg(data);
    if (data.message_type == 'private') return receivePrivateMsg(data);
    return '未知的消息风格[message_type unknow]';
}

async function receiveGroupMsg(data) {
    //判断是否为vip群的消息
    let res = await appSql.sqlQuery("receiver","receiver_id",data.group_id,"permission")
    if(res.length != 0) vipGroupMsg(data.group_id, data.message,data.sender,data.user_id);
    return `有群消息:(${data.group_id})${data.message}`;
}

async function receivePrivateMsg(data) {
    //判断是否为vip QQ号（此处逻辑与vip群不同，为了发送无权限提示所以需要同步判断）
    let res = await appSql.sqlQuery("receiver","receiver_id",data.user_id,"permission")
    if(res.length != 0)  vipQQMsg(data.user_id, data.message);
    else noPermissionMsg(data.user_id, 'private');
    return `有QQ私聊消息:(${data.user_id})${data.message}`;
}

function noPermissionMsg(receiver, type) {
    //无权限执行
    sendTextMsg(type, receiver, '对不起，主人不让我和不认识的人讲话。',appSql);
}

function vipGroupMsg(group, receive,sender,user_id) {
    sendCommonMsg(group, receive, 'group',sender,user_id);
};

function vipQQMsg(qq, receive) {
    sendCommonMsg(qq, receive, 'private',"",'');
}

function noInjection(receive){
    receive.replace("`","'")
    return receive
}

async function sendCommonMsg(receiver, receive, type,sender,user_id) {
    //发送通用消息
    // receiver 要发送消息的接收者（qq群号或qq号）
    // receive  机器人接收到消息（String）
    // type     类型 group private
    receive = noInjection(receive)    
    saveTalkHistory(receiver,receive,type,sender,time,appSql)//存历史记录
    try {
        for(let el of appModules.complex){
            if(await el.run(receiver,receive,type,appSql,sender)) return//复杂模块，run入口
        } 
        for(let el of appModules.aloneReply){//遍历模块
                if(await el.isRun(receive,receiver,appSql)) {
                    el.run(receiver,receive,type,appSql,sender)
                    return
                } 
        }
    } catch (error) {
        console.warn("模块错误")
        console.warn(error)
    }
}