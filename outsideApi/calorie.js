const axios = require("axios")
const {sendTextMsg} = require("../sendMsg/send_msg")

function sendCalorieMsg(receiver, receive, type){
    //卡路里消息
    receive = receive.replace(/卡路里：/,"")
    axios.get(encodeURI(`https://www.mxnzp.com/api/food_heat/food/search?keyword=${receive}&page=1&app_id=rgihdrm0kslojqvm&app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09`)).then(res=>{
        let message = ""
        try {
            if (res.data.data.totalCount!= 0){
                let num = res.data.data.list.length
                if(res.data.data.list.length>3) num = 3
                for(let i = 0;i<num;i++){
                    message=`相关食物：${res.data.data.list[i].name}，\n所含卡路里：${res.data.data.list[i].calory}千卡/100g或100ml，\n健康等级：${res.data.data.list[i].healthLevel}\n`
                    sendTextMsg(type, receiver, message);
                }
            }else{
                message = "没查询到这个食物呢"
                sendTextMsg(type, receiver, message);
            }
        } catch (error) {
            message = "出问题了,接口故障"
            sendTextMsg(type, receiver, message);
        }   
    })
}

function isRun(receive){
    return /^卡路里：/.test(receive)
}

function run(receiver, receive, type){
    sendCalorieMsg(receiver, receive, type)
}
module.exports = {sendCalorieMsg,isRun,run}