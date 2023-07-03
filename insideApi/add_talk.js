//api模块写法演示
const {sendMsg} = require("../sendMsg/send_msg")//引入所需模块

async function addTalk(receiver,receive,type,appSql) {
    // console.log("这里是addtalk方法");
    if (await isAdmin(receiver,appSql)) {
        let str = receive.replace("DD添加对话：", '');
        appSql.sqlInsert("public_talk",{receive:str.substr(0, str.indexOf('///')),send:str.substr(str.indexOf('///') + 3)})
    } else {
        sendMsg(type, receiver, '此功能需要经过主人同意才可以用哦',appSql);
    }
}

async function isAdmin(receiver,appSql) {
    // console.log(receiver)
    let res=await appSql.sqlQuery("receiver","receiver_id",receiver)
    // console.log(res)
    if(res[0].permission == "admin") return true
    return false
}

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return /^DD添加对话：/.test(receive)
}

function run(receiver, receive, type,appSql){//入口方法
    addTalk(receiver, receive, type,appSql)
}

module.exports = {addTalk,isRun,run}//暴露的方法，必须暴露入口方法和条件方法