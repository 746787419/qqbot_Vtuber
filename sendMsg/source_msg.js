let {sendMsg} = require('./send_msg')

function sourceMsg(hour,appSql) {
    //又他妈是递归，不过这个没那么恶心
    // 单位小时
    let pool = appSql.getPool()
    let randomMax = 1000 * 60 * 60 * hour;
    let timerMillisecond = parseInt(randomMax * Math.random());
    // console.log(timerMillisecond);
    setTimeout(() => {
        pool.query('select count(*) from source_talk', ((err, result) => {
            if (err) throw err;
            pool.query('select * from source_talk ORDER BY id desc LIMIT ?,1', [Math.floor(result[0]['count(*)'] * Math.random())], function (error, dataResult) {
                if (err) throw err;
                console.log(Math.floor(Math.random() * adminGroup.length));
                let groupId = adminGroup[Math.floor(Math.random() * adminGroup.length)];
                sendMsg('group', groupId, dataResult[0].send,appSql);
                sourceMsg(hour);
            });
        }));
    }, timerMillisecond);

}

module.exports={sourceMsg}