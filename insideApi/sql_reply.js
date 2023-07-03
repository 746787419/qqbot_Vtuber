//api模块写法演示
const {sendMsg} = require("../sendMsg/send_msg")//引入所需模块
const axios = require("axios")

let appSql = null
let pool = null
function fromSQLSelect(receive, receiver, type,appSqlp) {
    // console.log("进入fromSQLSelect")
    appSql= appSqlp
    if(!pool) pool = appSql.getPool()
    //数据库搜索功能
    axios.get(encodeURI(`http://api.pullword.com/get.php?source=${receive}&param1=0&param2=1&json=1`)).then((res => {
        // console.log("进入分词")
        let arr = res.data;
        try {
            arr.sort(compare('p'));
            allCharQueery(receive, receiver, type).then(function () {
                sqlQueryTalk(arr, receive, receiver, type, arr.length - 1);
            }); //先查询整句  
        } catch (error) {
            console.warn(error)
        }
    })).catch(err =>{
        return
    });
}
function compare(key) {
    return function (value1, value2) {
        var val1 = value1[key];
        var val2 = value2[key];
        return val1 - val2;
    }
}

function allCharQueery(receive, receiver, type) {
    //整句查询
    // console.log("进入allCharQueery")
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM public_talk WHERE receive=?", [receive], (err, result) => {
            if (err) throw err;
            // console.log(result);
            if (result.length <= 0) {
                resolve();
                return;
            }
            sendMsg(type, receiver, result[Math.floor(Math.random() * result.length)].send,appSql);
        });
    });
}

//递归查群arr数组中每个词
function sqlQueryTalk(arr, receive, receiver, type, arrIndex) {
    // console.log("进入sqlQueryTalk")
    // console.log(arr);
    if (arrIndex < 0) {
        return;
    };
    let maxT = arr[arrIndex].t;
    //修改结果
    let removeChars = ['的', '地', '得', '了', '啊'];
    for (let j = 0; j < removeChars.length; j++) {
        maxT = maxT.replace(removeChars[j], '');
    }
    //数据库查询正确率最高的词
    if (maxT.trim() == '' && type == 'group') return; //群里先不用空字符查询
    let sql = 'SELECT * FROM public_talk WHERE receive = ?';
    console.log("maxT:"+maxT);
    pool.query(sql, [maxT], (err, result) => {
        if (err) throw err;
        //随机输出查询结果的一个
        // console.log('arrIndex：' + arrIndex, 'maxT:' + maxT);
        if (!result.length) {
            sqlQueryTalk(arr, receive, receiver, type, arrIndex - 1);
            return;
        }
        sendMsg(type, receiver, result[Math.floor(Math.random() * result.length)].send,appSql);
    });
}

function isRun(receive){ //条件方法，参数为消息内容，返回Boolean执行条件
    return true
}

function run(receiver, receive, type,appSql){//入口方法
    fromSQLSelect(receive,receiver , type,appSql)
}

module.exports = {isRun,run}//暴露的方法，必须暴露入口方法和条件方法