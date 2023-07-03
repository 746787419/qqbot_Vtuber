//api模块写法演示
const {sendMsg} = require("../sendMsg/send_msg")//引入所需模块

function cute(receive, receiver, type) {
    let emojis = ['w(ﾟДﾟ)w', '(ノへ￣、)', '(￣_,￣ )', 'ヽ(✿ﾟ▽ﾟ)ノ', '(๑•̀ㅂ•́)و✧', '(￣ε(#￣)☆╰╮o(￣皿￣///)', '（づ￣3￣）づ╭❤～', 'Σ( ° △ °|||)︴', ' (～￣(OO)￣)ブ', '凸(艹皿艹 )', '(* ￣3)(ε￣ *)', '(*￣rǒ￣)', '︿(￣︶￣)︿'];
    let i = 0;
    //objList 大对象 type 消息类型 objIndex 群号或者qq号对应的位置
    if (objList[type][objIndex(receiver, type)].onlineEmojiTimer == null) {
        objList[type][objIndex(receiver, type)].onlineEmojiTimer = setInterval(() => {
            sendMsg(type, receiver, emojis[i]);
            i++;
            if (i >= emojis.length) {
                clearInterval();
                objList[type][objIndex(receiver, type)].onlineEmojiTimer = null;
            }
        }, 2000);
    }
}
function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return receive == 'DD开始在线卖萌'
}

function run(receiver, receive, type){//入口方法
    cute(receive, receiver, type)
}



module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法
