const {sendTextMsg}=require('../sendMsg/send_msg')
const config = require('./config')

function isRun(receive,receiver,appSql){
    if(receive==config.START_GAME) return true
    return false
}

async function run(receiver,receive,type,appSql,sender){
    if(type == "group"){//判断是否为群组
        await addRoom(receiver,type,appSql)
    }else{
        sendTextMsg(type,receiver,config.game_message.ONLY_GROUP_PLAY)
    }
}

async function addRoom(receiver,type,appSql){
    let res = await appSql.sqlQuery('werewolf_killing','id',receiver,'count(*)')
    if(res[0]['count(*)'] > 0) {//如果已经开始过游戏，跳出方法
        sendTextMsg(type, receiver,config.game_message.BUG_GAME_ALREADY_START)
        return
    }
    await appSql.sqlInsert('werewolf_killing',{id:receiver,isready:1})
    sendTextMsg(type,receiver,config.game_message.GAME_START)
}

module.exports = {run,isRun}