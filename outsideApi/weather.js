//api模块写法演示
let axios = require('axios')
const {sendMsg} = require("../sendMsg/send_msg")//引入所需模块

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return receive == '天气'
}

function run(receiver, receive, type,appSql){//入口方法
      //天气功能
      axios.get('https://api.seniverse.com/v3/weather/now.json?key=SCYrvkytJze9qyzOh&location=beijing&language=zh-Hans&unit=c').then(res => {
        sendMsg(type, receiver, `目前${res.data.results[0].location.name}天气：${res.data.results[0].now.temperature}摄氏度 ${res.data.results[0].now.text}`,appSql);
    });
}

module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法