//api模块写法演示
const axios = require("axios")
const {sendTextMsg} = require("../sendMsg/send_msg")//引入所需模块


function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return receive == '动漫图片'
}

function run(receiver, receive, type){//入口方法
    axios.get('https://www.dmoe.cc/random.php?return=json').then(res => {
            sendTextMsg(type, receiver, `[CQ:image,file=anime.jpg,url=${res.data.imgurl}]`);
        });
}

module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法