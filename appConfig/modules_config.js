/*模块配置文件 模块先后顺序决定判断的执行顺序，需注意*/
module.exports={
    aloneReply:[
        require('../insideApi/xxy_ydb'),
        require('../outsideApi/calorie'),
        // require('../outsideApi/pixiv_api'),  
        require('../outsideApi/sing_a_song'),
        require('../outsideApi/anime_img'),
        require('../outsideApi/weather'),
        require('../outsideApi/baike'),
        require('../insideApi/test'),//api样例
        require('../insideApi/help'),
        require('../insideApi/add_talk'),
        require('../insideApi/change_state'),
        require('../insideApi/sql_reply')//数据库回复固定在结尾，除非买得起chatgpt
    ],
    complex:[
        //require('../werewolf/run')
    ]
    
}
