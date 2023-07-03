//api模块写法演示
const {sendVoiceMsg} = require("../sendMsg/send_msg")//引入所需模块

function stopCuteTimer(receive, receiver, type) {
    //Cute停止功能
    if (objList[type][objIndex(receiver, type)].onlineEmojiTimer != null) {
        clearInterval(objList[type][objIndex(receiver, type)].onlineEmojiTimer);
        objList[type][objIndex(receiver, type)].onlineEmojiTimer = null;
    }
}

function remindTimer(receive, receiver, type) {
    //提示计时器功能
    if (objList[type][objIndex(receiver, type)].remindMeTimer != null) {
        sendMsg(type, receiver, '对不起哦，我已经在记时了~');
        return;
    }
    let min = receive.replace("分钟后提醒我", '');
    min = parseFloat(min);
    // console.log(min, typeof min);
    if (!isNaN(min) && min < (Number.MAX_VALUE / 60 / 1000)) {
        sendMsg(type, receiver, '收到!Master');
        let millisecond = parseInt(min * 60 * 1000);
        objList[type][objIndex(receiver, type)].remindMeTimer = setTimeout(() => {
            sendMsg(type, receiver, '时间到了啦！');
            objList[type][objIndex(receiver, type)].remindMeTimer = null;
        }, millisecond);
    } else {
        sendMsg(type, receiver, '请输入数字格式的时间哦');
    }
    // console.log('提醒');

}

function objIndex(receiver, type) {
    //找聊天对象在大对象的位置
    let index = 0;
    for (let j = 0; j < objList[type][j].length; j++) {
        if (objList[type][j].id == receiver) {
            objIndex = j;
        }
    }
    return index;
}


function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return /分钟后提醒我$/.test(receive) || (receive == '停下来')
}

function run(receiver, receive, type){//入口方法
}

module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法