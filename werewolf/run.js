const modules = require("./modules_config")

async function run(receiver,receive,type,appSql,sender){
    for(let el of modules){//遍历模块
        if(await el.isRun(receive,receiver,appSql)) {
            el.run(receiver,receive,type,appSql,sender)
            return true
        } 
    }
    return false
}

module.exports = {
    run
}