//api模块写法演示
const {sendMsg} = require("../sendMsg/send_msg")//引入所需模块

async function sendTypeChange(receive, receiver, type,appSql) {
    let pool = appSql.getPool()
    // console.log(appSql)
    let res = await appSql.sqlQuery("receiver","receiver_id",receiver)
    if(res[0].send_type == "text"){
        pool.query('UPDATE receiver SET send_type = ? WHERE receiver_id = ?',['tts',receiver],(err,result)=>{
            if(err) throw err;
            sendMsg(type, receiver, '已转换为语音模式',appSql);
        });
    }
    if(res[0].send_type == "tts"){
        pool.query('UPDATE receiver SET send_type = ? WHERE receiver_id = ?',['text',receiver],(err,result)=>{
            if(err) throw err;
            sendMsg(type, receiver, '已转换为文字模式',appSql);
        });
    }
}

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return receive == 'DD转换模式'
}

function run(receiver, receive, type,appSql){//入口方法
    sendTypeChange(receive, receiver,type,appSql)
}

module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法