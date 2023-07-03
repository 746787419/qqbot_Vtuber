async function saveTalkHistory(receiver,receive,type,sender,time,appSql){
    let pool = appSql.getPool()
    let sql_sender = ''
    let sql_group_number = ''
    if(type == "group"){
        sql_sender = sender.user_id
        sql_group_number = receiver
    }else{
        sql_sender = receiver
    }
    pool.query("INSERT INTO talk_history (`sender`, `message`,`time`,`group_number`) VALUES (?,?,?,?)",[sql_sender,receive,time,sql_group_number],(err,result)=>{
        console.log(err)
    })
} 

function sleep(time){
    //等？秒
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve()
            clearTimeout()
        }, time);
    })
}

//随机排列数组 来自chatGPT
function shuffle(arr) {
    let currentIndex = arr.length;
    let temporaryValue;
    let randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
  
    return arr;
  }

module.exports={
    saveTalkHistory,sleep,shuffle
}