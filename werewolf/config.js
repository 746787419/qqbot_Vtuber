module.exports = {
    START_GAME : '开始狼人杀',
    START:'开始',
    ADD:'参加',
    OVER_GAME:'结束狼人杀',
    game_message:{
        ONLY_GROUP_PLAY :'狼人杀只能在群里玩哦！',
        GAME_START:'狼人杀开始了哦！请参加的玩家发送“参加”加入游戏，输入“开始”开始游戏（测试别当真）',
        BUG_GAME_ALREADY_START :'错误：游戏已经开启',
        GAME_OVER:'狼人杀游戏结束了呢！',
        PLAYER_IS_FULL:'人数已经最多了哦，请发送（开始）开始游戏',
        GAMER_ALREADY_ADD:(nickname)=> `QQ:${nickname} 之前已经加入游戏了哦！`,
        NO_PERMISSION:(nickname)=>`${nickname} 暂时没有权限参加游戏，请与管理员联系哦~`,
        GAMER_ALREADY_ADD_IN_OTHER_GROUP:(nickname)=>`${nickname} 已经在其他群参与游戏了，结束前不可以再加入了哦~`,
        GAMER_SUCCESS_ADD:(nickname)=>`${nickname} 成功加入游戏`,
        INSUFFICIENT_GAMER:(gameLength)=>`当前共${gameLength}名玩家，需要6-9名玩家才能开始游戏。`,
        ROLE_NOTIFICATION:(number,role)=>`你是${number}号玩家，你的身份是（${role}），请不要告诉其他玩家。`,
        ROLE_NOTIFICATION_IN_GROUP:'身份已发放，游戏即将开始，请各位玩家做好准备',
        DONT_DISTURB_WHEN_ADD_GANER:"现在正在报名狼人杀哦，请不要打扰DD统计"
    },
    role:{
        wolf:'狼人',
        populace:'平民',
        witch:'女巫',
        prophet:'预言家',
        hunter:'猎人',
        error:'错误身份',
    },
    game_step:{
        GET_DARK_WOLF_OPEN_EYES : 0, //天黑状态下狼人睁眼情况
        GET_DARK_WOLF_TALK : 1, //天黑狼人讨论
        GET_DARK_PROPHET_OPEN_EYES : 2, //预言家睁眼
        GET_DARK_WITCH_OPEN_EYES : 3, //女巫睁眼
        GET_DARK_HUNTER_OPEN_EYES : 4, //猎人睁眼
        DAY_BREAK : 1 //天亮
    }
}