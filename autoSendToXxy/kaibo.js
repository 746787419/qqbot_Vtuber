// https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo?room_ids=23224539&req_biz=video
let axios = require('axios')
let {sendTextMsg} = require('../sendMsg/send_msg')
let biliConfig = require('../appConfig/bilibili_config')

function kaibo(appSql){
    setInterval(()=>{
        sendKaibo(appSql)
    },10000)
}

async function sendKaibo(appSql){
    let res = await axios.get(`https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo?room_ids=${biliConfig.ROOM_ID}&req_biz=video`)
    let data = res.data.data.by_room_ids[biliConfig.ROOM_ID]
    let databaseChange = await appSql.sqlQuery('xxy_config','id',1)
    let isChangeState = databaseChange[0].value
    console.log(`api直播状态：${data.live_status}，数据库直播状态：${isChangeState}`) //
    if(isChangeState == data.live_status) return
    if(data.live_status) {//data.live_status
        console.log(`开播，标题：${data.title}`)
        
        sendTextMsg('group',biliConfig.GROUP_NUMBER,`[CQ:at,qq=all]\n开播啦！${data.title}\n[CQ:image,file=bb.jpg,url=${data.cover}]\n${data.live_url}`)  //开播文字消息

        // setTimeout(function() {
            //  sendTextMsg('group','',"[CQ:record,file=...]")//开播语音
        // }, 500);
        //
    }else{
        console.log(`结束直播`)
    }
    appSql.sqlUpdate('xxy_config',{value:data.live_status},'id',1)
}
module.exports = {kaibo}