const express = require('express')
const appSql = require('../tool/appSql')
appSql.initPool()
const pool = appSql.getPool()
// const axios = require('axios')
const router = express.Router()

router.get('/history',(req,res)=>{
    let page = req.query.page
    if(!page) page = 1
    let start = (page-1)*20
    let end = start+21
    pool.query("SELECT * FROM talk_history WHERE id>? and id<?",[start,end],(err,result)=>{
        res.send(result)
    })
})


module.exports = router