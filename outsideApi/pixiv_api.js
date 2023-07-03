const axios = require("axios")
const {sendTextMsg} =require("../sendMsg/send_msg")

function sendSETUMsg(receiver, receive, type){
    let str=receive.replace('搞黄色','');
    if(str == "幼女"){
         sendTextMsg(type,receiver,'存放处真该死！');
        return
    }
    axios.get(encodeURI(`https://api.lolicon.app/setu/v2?r18=0&keyword=${str}`)).then(res=>{
        if(res.data.data.length == 0 ){
            sendTextMsg(type,receiver,'哎，没找到啊！');
            return;
        }
        console.log(res.data.data[0].urls.original)
        sendTextMsg(type, receiver,`[CQ:image,file=anime.jpg,url=${res.data.data[0].urls.original}]`);
    },err=>{
        console.log(err)
    });
}
function isRun(receive){
    return /搞黄色$/.test(receive)
}

function run(receiver, receive, type){
    sendSETUMsg(receiver, receive, type)
}

module.exports = {sendSETUMsg,isRun,run}