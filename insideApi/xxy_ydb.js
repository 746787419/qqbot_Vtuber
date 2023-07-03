//api模块写法演示
const {sendTextMsg} = require("../sendMsg/send_msg")//引入所需模块
const {pic} = require('../appConfig/xxy_config')
let biliConfig = require('../appConfig/bilibili_config')

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    switch (receive) {
        case biliConfig.CURRICULUM_SHOW:
            return true
        default:
            return false
    }
}

async function run(receiver, receive, type,appSql){//入口方法
    let res = await appSql.sqlQuery('xxy_config','v_key',"kebiao")
    console.log(res[0].value.toString())
    sendTextMsg(type, receiver,res[0].value.toString());
}

module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法