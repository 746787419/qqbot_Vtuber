const { sendTextMsg } = require("../sendMsg/send_msg")
const config = require("./config")

function isRun(receive,receiver,appSql){
    if(receive == config.OVER_GAME) return true
    return false
}

async function run(receiver,receive,type,appSql,sender){
    try {
        await appSql.sqlDelete('werewolf_killing','id',receiver)
        await appSql.sqlUpdate('receiver',{game_group_number:''},'game_group_number',receiver)
        sendTextMsg(type,receiver,config.game_message.GAME_OVER)
    } catch (error) {
        console.warn(error)
    }
}

module.exports={isRun,run}