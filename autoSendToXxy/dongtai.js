// https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=1359949418&offset_dynamic_id=0
let axios = require('axios')
let {sendTextMsg} = require('../sendMsg/send_msg')
let md5 = require('md5')
let biliConfig = require('../appConfig/bilibili_config')
let send_log = 0

function dongtai(appSql){
     setInterval(()=>{
         try {
             sendDongtai(appSql)
         } catch (e) {
             console.log('错误：'+e)
         }
        
    },30000)
}

async function sendDongtai(appSql){
    let uid = biliConfig.UID
    let res = await axios.get(`https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=${uid}&offset_dynamic_id=0`)
    let firstDongtai = res.data.data.cards[0].card
    firstDongtai = JSON.parse(firstDongtai)
    let description =null
     let img = null
    if(firstDongtai.item.description){
          description = firstDongtai.item.description
         
    }
    else if(firstDongtai.item.content){
        description = firstDongtai.item.content+`\n⭐${biliConfig.UNAME}分享了一个内容，点击查看。⭐`
        console.log(firstDongtai.item)
    }
    else{
        // if(!send_log){
        //     await appSql.sqlUpdate('xxy_config',{value:firstDongtai},'v_key',"log")
        //     sendTextMsg('private','',"新的动态格式")
        //     send_log = 1
        // }
        return
    }
    img = firstDongtai.item.pictures?firstDongtai.item.pictures[0].img_src:0
    img = img?`[CQ:image,file=bb.jpg,url=${img}]`:''
    // console.log(firstDongtai)
    let result = await appSql.sqlQuery('xxy_config','v_key',"dongtai_text")
    let md5text = md5(description)
    console.log(`API动态字：${md5text} 数据库动态字:${result[0].value}`)
    if(result[0].value == md5text) return

    /* 下面是课程表名称 正则表达式格式 是用于捕获bilibili动态中课程表内容 */

    if(biliConfig.CURRICULUM_TEXT.test(description)){
        await appSql.sqlUpdate('xxy_config',{value:img},'v_key','kebiao')
    }//判断是不是课表


    await appSql.sqlUpdate('xxy_config',{value:md5text},'v_key',"dongtai_text")
    sendTextMsg('group',biliConfig.GROUP_NUMBER,`${biliConfig.UNAME}有一条新的动态：\n${img}\n${description}\n链接：https://space.bilibili.com/${uid}/dynamic`)
}

module.exports = {dongtai}