//api模块写法演示
const axios = require('axios')
const {sendTextMsg} = require("../sendMsg/send_msg")//引入所需模块

function baike(receiver, receive, type) {
    console.log(receive)
    //百度百科功能
    axios.get(encodeURI(`https://baike.baidu.com/api/openapi/BaikeLemmaCardApi?appid=379020&bk_key=${receive.replace(/百度百科：/, '')}`)).then(res => {
        if (JSON.stringify(res.data) != '{}') {
            let msg =`${res.data.title}:\n${res.data.abstract}`
            isMsgLengthTooLong(msg)
            function isMsgLengthTooLong(msg){
                setTimeout(()=>{
                    if(msg.length>80){
                        let str1 = msg.slice(0,80)
                        sendTextMsg(type, receiver, str1)
                        isMsgLengthTooLong(msg.slice(80,msg.length))
                        clearTimeout()
                    }else{
                        sendTextMsg(type, receiver, msg)
                        // 临时加的，文本分开，看起来不好看但是能运行就行
                        setTimeout(() =>{
                            sendTextMsg(type, receiver, res.data.url)
                            clearTimeout()
                        }, 1000);
                        clearTimeout()
                    }
                },1000)
            }
        } else {
            sendTextMsg(type, receiver, `对不起，百度不到（＝。＝）`);
        }
    });
}

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return /^百度百科：/.test(receive)
}

function run(receiver, receive, type){//入口方法
    baike(receiver, receive, type)
}

module.exports = {baike,isRun,run}//暴露的方法，必须暴露入口方法和条件方法