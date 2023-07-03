const mysql = require('mysql');
const config = require('../appConfig/server_config')
let pool = null
function initPool(){
    pool=mysql.createPool({
        connectionLimit: 5,
        host: config.SQL_url,
        port: config.SQL_port,
        user: config.SQL_user,
        password: config.SQL_password,
        database: config.SQL_database
    });
    return pool
}

function sqlUpdate(tablename,values,wherekey,whereprice){
    // 数据库修改，新代码用，老代码不改了
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE ${tablename} SET ? WHERE ${wherekey} = ?`,[values,whereprice],(err,result)=>{
            resolve(result)
        })
    })
}

function sqlQuery(tablename,wherekey,whereprice){//千万不要让用户写前两个参数，以免注入
    // 数据库查询，新代码用，老代码不改了
    return new Promise((resolve, reject)=>{
        let selectWhat = "*"
        if(arguments.length == 4){
            selectWhat=arguments[3]
        }
        pool.query(`SELECT ${selectWhat} FROM ${tablename} WHERE ${wherekey} = ?`,[whereprice],(err,result)=>{
            if(err) console.log(err)
            // console.log("result:"+result)
            resolve(result)
        })
    })
}

async function sqlInsert(tablename,attributeCollection){
    return await pool.query(`INSERT INTO ${tablename} SET ?`,[attributeCollection])
}

async function sqlDelete(tablename,wherekey,whereprice){
    return await pool.query(`DELETE FROM ${tablename} WHERE ${wherekey} = ?`,[whereprice])
}

function getPool(){
    return pool
}

module.exports = {initPool,sqlUpdate,sqlQuery,sqlInsert,sqlDelete,getPool}