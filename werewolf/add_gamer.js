const config = require('./config')
const {sendTextMsg} = require('../sendMsg/send_msg')

async function isRun(receive,receiver,appSql){
    //判断一下群是否开始游戏
    let res = await appSql.sqlQuery('werewolf_killing','id',receiver,'count(*)')
    if(receive==config.ADD && res[0]['count(*)'] > 0) return true
    return false
}

async function run(receiver,receive,type,appSql,sender){
    let res = await appSql.sqlQuery('receiver','receiver_id',sender.user_id,'game_group_number')
    switch (res[0].game_group_number) {
        case receiver.toString()://是本群玩家
            sendTextMsg(type,receiver,config.game_message.GAMER_ALREADY_ADD(sender.nickname))
            break;
        case ''://未参加游戏的玩家
            let gamersRes = await appSql.sqlQuery('werewolf_killing','id',receiver,'gamer')
            let gamers = JSON.parse(gamersRes[0].gamer)
            gamers.push({id:sender.user_id,state:"alive",role:"populace",username:sender.nickname})
            await appSql.sqlUpdate('werewolf_killing',{'gamer':JSON.stringify(gamers)},'id',receiver)
            await appSql.sqlUpdate('receiver',{game_group_number:receiver},'receiver_id',sender.user_id)
            sendTextMsg(type,receiver,config.game_message.GAMER_SUCCESS_ADD(sender.nickname))
            break;
        default://在其他群参加游戏的玩家
            sendTextMsg(type,receiver,config.game_message.GAMER_ALREADY_ADD_IN_OTHER_GROUP(sender.nickname))
            break;
    }
}

module.exports={isRun,run}