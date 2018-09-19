
var PHZTable = cc.Layer.extend({
    uiNode: null,
    retNetNum:0,
    getUI: function (key) {
        return this.uiNode.getChildByName(key);
    },

    ctor: function () {

        this._super();
        var self = this;

        cc.spriteFrameCache.addSpriteFrames("public/res/img/bigface.plist");
        this.uiJson = ccs.load(PackName+"/res/table.json");
        this.uiNode = this.uiJson.node;
        this.addChild(this.uiNode);

        if( this.uiJson.action)
        {
            this.uiNode.runAction( this.uiJson.action);
        }
        //初始化数据模型
        PHZModel.reset();
        PHZModel.roomData = JSON.parse( ZJHModel.getInstance().getRoomData());
        PHZModel.curRoomID = ZJHModel.getInstance().curRoomID;

        this.initView();

        //  Sound.getInstance().preLoadEffect("js/"+PackName+"/res/sound");
        Sound.getInstance().PlayBgSound(PackName+"/res/sound/background.mp3");

        this._listenerExit = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "will_exit_room",
            callback: function (evt) {
                cc.log("will_exit_room");
                PHZModel.release();
                ccs.ArmatureDataManager.destroyInstance();
                cc.spriteFrameCache.removeSpriteFrames();
                cc.textureCache.removeAllTextures();
                jsb.fileUtils.purgeCachedEntries();

                self.unscheduleAllCallbacks();
                if(self.videoBox)
                {
                    self.videoBox.unscheduleAllCallbacks();
                }

                self.removeFromParent();
                if( ZJHModel.getInstance().gameUseDefaultSetting != undefined)
                {
                    ZJHModel.getInstance().gameUseDefaultSetting = true;
                }
            }
        });
        cc.eventManager.addListener(this._listenerExit, this);

        if (ZJHModel.getInstance().isOnVideo) {

            this.videoBox = new PHZVideo();
            this.addChild(this.videoBox,111111);
            this.videoBox.runScript(this);
        }
        else {
            this.init();
        }
        PHZModel.isOnVideo = ZJHModel.getInstance().isOnVideo;

        return true;
    },
    init:function()
    {
        var self = this;
        //监听联网状态
        this.schedule(this.updateGame, 0.0);
        this.schedule(this.hearbeat, 3.0);

        if( ZJHModel.getInstance().gameUseDefaultSetting != undefined)
        {
            ZJHModel.getInstance().gameUseDefaultSetting = false;
        }
        PHZPlayers.publicBox = RoomPublic.create();
        PHZPlayers.publicBox .setCallback(function (tag) {
            if (tag == "exit") {
                PHZModel.sendDowntable();
                PHZModel.sendLogout();
            }
            else if (tag == "end_room") {
                PHZModel.sendReqRoomEnd();
            }
            else if(tag == "down_table")
            {
                PHZModel.sendDowntable();
            }
            else if(tag == "game_setting")
            {
                if( ZJHModel.getInstance().gameUseDefaultSetting != undefined)
                {
                    var box = new SettingBox();
                    this.addChild(box , 1001);
                }
            }

        }.bind(this));
        this.addChild(PHZPlayers.publicBox , 1000);

        //部分事件监听
        this._listenerGameOver = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "notify_against_room_end",
            callback: function (evt) {
                self.onGameOver();
                cc.log("notify_against_room_end");
            }
        });
        cc.eventManager.addListener(this._listenerGameOver, this);

        PHZModel.initNet( PHZModel.roomData["gameRoom"]["way"]["ip"],Number(PHZModel.roomData["gameRoom"]["way"]["port"]));
        PHZModel.connectNet();

        PHZTips.showWaitTip("等待游戏开始");
    },
    //初始化界面
    initView:function()
    {
        utils.scaleAll(this.getUI("bg"));

        PHZAction.uiNode =  this.getUI("btns");
        PHZAction.clickCBTarget =this;
        PHZAction.clickCB = this.onBtnClickEvt;
        PHZAction.init();

        PHZCards.uiNode =  this.getUI("cards");
        PHZCards.uiAction =  this.uiJson.action;
        PHZCards.init();
        
        PHZPlayers.uiNode =  this.getUI("players");
        PHZPlayers.init();

        PHZTips.uiNode =  this.getUI("tips");
        PHZTips.init();

        this.chiBox =new PHZChiBox();
        this.addChild( this.chiBox,100);
        this.chiBox.setVisible(false);

        sys.localStorage.setItem("sound", ZJHModel.getInstance().sound);
        sys.localStorage.setItem("bgMusic", ZJHModel.getInstance().bgMusic);
        sys.localStorage.setItem("vibrate", ZJHModel.getInstance().vibrate);
       var index = sys.localStorage.getItem("phz1_sound_index");
        if(index == null)
        {
            PHZModel.soundIndex =2;
            sys.localStorage.setItem("phz1_sound_index",2);
        }
        else
        {
            PHZModel.soundIndex =index;
        }

    },
    //心跳处理
    hearbeat:function( dt) {
        PHZModel.sendHearbeat();
    },
    //联网监听
    updateGame:function( dt)
    {
        var curTime = (new Date).valueOf()/1000;
        //如果游戏退出到后台，返回前台时
        if(ZJHModel.getInstance().gamePuase)
        {
            ZJHModel.getInstance().gamePuase =false;
            PHZModel.lastHearbeatTime =0;
            PHZModel.clearCMD();
            PHZModel.waitUpdateInfo = true;
            PHZModel.connectNet();
            return;
        }
        //心跳包超时
        if(PHZModel.lastHearbeatTime != 0 && (curTime - PHZModel.lastHearbeatTime ) > 10)
        {
            PHZModel.clearCMD();
            PHZModel.connectNet();

            PHZModel.lastHearbeatTime = curTime;
            if( this.retNetNum >0)
            {
                PHZTips.showAllTip("网络连接异常，正在重试");
            }
            this.retNetNum ++;
            return;
        }
        if(PHZModel.isFaPai )
        {
            return;
        }
        var response = PHZModel.getNetData();
        if(response != null)
        {
            if(response.cmd ==TCPSendCMD.DISCONNECT_RES || response.cmd ==TCPSendCMD.CONNECT_ERROR_RES
                || response.cmd ==TCPSendCMD.SEND_DATA_ERROR_RES|| response.cmd ==TCPSendCMD.RECV_DATA_ERROR_RES) {
                cc.log("tcp error:" + response.cmd);
                if (!PHZModel.isLogout) {
                    PHZModel.connectNet();
                }
                if (PHZModel.lastHearbeatTime == 0)
                {
                    PHZModel.lastHearbeatTime = utils.getTimeStamp();
                }

            }
            else if( response.cmd ==TCPSendCMD.CONNECT_OK_RES)
            {
                PHZModel.clearCMD();
                cc.log("tcp connect succ!/n cmd:"+response.cmd +" data:"+response.data );
                if (!PHZModel.isLogout) {
                    PHZModel.sendLogin();
                }
            }
            else if( response.cmd ==TCPSendCMD.RECV_DATA_OK_RES)
            {
                var  d = response.parseDatta();
                this.handlerCMD(d,true);
            }
            response.release();
        }

    },

    //重置游戏信息
    resetGame:function()
    {
        PHZAction.reset();
        PHZCards.reset();
        PHZTips.reset();
        PHZPlayers.reset();
        PHZModel.resetPre();

        var player = PHZModel.getPlayerBySeatID(PHZModel.seatID);
        if(player)
        {
            ZJHModel.getInstance().rmb = player.rmb;
            ZJHModel.getInstance().money = player.money;
            ZJHModel.getInstance().coin = player.coin;
        }
        this.chiBox.show(false);

    },

    showEndRoom:function(val)
    {
        if(!PHZModel.isMyInTable())
        {
            return;
        }
        var player = PHZModel.getPlayerByUID(val["uid"]);
        if(!player)
        {
            return;
        }
        var json ={};
        json["ownerid"] = player.uid;
        json["ownername"] = player.name;
        json["time_left"] = val["remain_time"];

        var isCan=ZJHModel.getInstance().uid == player.uid;
        json["players"] = [];
        if(val.hasOwnProperty("voters_uid"))
        {
            for (var i = 0; i < val["voters_uid"].length; i ++)
            {
                var d = {};
                var p = PHZModel.getPlayerByUID(val["voters_uid"][i]);
                if(p)
                {
                    d["uid"] = p.uid;
                    d["name"] = p.name;
                    d["avatar"] = p.avatar;
                    d["state"] = 0;
                    if(ZJHModel.getInstance().uid == p.uid)
                    {
                        isCan = true;
                    }
                    json["players"].push(d);
                }

            }
        }
        if(!isCan)
        {
            return;
        }
        if(this.roomEndBox)
        {
            this.roomEndBox.removeFromParent(true);
        }
        this.roomEndBox = RoomHEndTouPiao.create();
        this.roomEndBox.initWithJsonStr(JSON.stringify(json));
        this.addChild(this.roomEndBox,10000);

        this.roomEndBox.setCallback(function (str){
            if (str == "ok")
            {
                PHZModel.sendRoomEnd(1);
            }
            else if (str == "no")
            {
                PHZModel.sendRoomEnd(0);
            }
        });
    },

    onGameOver: function () {
        PHZModel.isGameOver = true;
        if(PHZModel.state == PHZState.GAME_FREE)
        {
            var self  =this;
            this.stopGameOver();
            var action = cc.sequence(cc.delayTime(5),cc.callFunc(function(){
                PHZModel.sendOver();
            }));
            action.setTag(10086);
            this.runAction(action);
        }
    },
    stopGameOver:function()
    {
        this.stopActionByTag(10086);
    },

//*************************** 按钮点击发送服务器处理 ************************************//
    //点击事件处理
    onBtnClickEvt:function(self,key)
    {
        cc.log("onBtn:"+key);

        Sound.getInstance().playEffect(utils.format("%1/res/sound/btn_click.mp3",PackName));
        switch(key)
        {
            case "readyBtn":
                PHZModel.sendReady();
                break;
            case "uptableBtn":
                PHZModel.sendUptable();
                break;
            case "guoBtn":
                PHZModel.sendAck(PHZAck.ACK_NULL,PHZChi.CK_NULL);
                break;
            case "chiBtn":
                if(PHZCards.chiVal.length == 1
                    && !PHZCards.chiVal[0].hasOwnProperty("second_info"))
                {
                    if (!PHZModel.ackAble) {
                        PHZModel.sendPreAck(PHZAck.ACK_CHI,PHZCards.chiVal[0]["chi_kind"]);
                        break;
                    }
                    PHZModel.sendAck(PHZAck.ACK_CHI,PHZCards.chiVal[0]["chi_kind"] );
                    return;
                }
                self.chiBox.show(true);
                self.chiBox.showCards( PHZCards.chiVal );
                break;
            case "pengBtn":
                if(!PHZModel.ackAble)
                {
                    PHZModel.sendPreAck(PHZAck.ACK_PENG);
                    break;
                }
                PHZModel.sendAck(PHZAck.ACK_PENG);
                break;
            case "huBtn":
                if(!PHZModel.ackAble)
                {
                    PHZModel.sendPreAck(PHZAck.ACK_HU);
                    break;
                }
                PHZModel.sendAck(PHZAck.ACK_HU);
                break;
            case "updateBtn":
               /* self.handlerGameEndBC({
                        "banker" : 3,
                        "base_money" : 1,
                        "cmd" : 4014,
                        "dianpao" : true,
                        "dianpao_user" : 0,
                        "end_type" : 1,
                        "hu_card" : 4,
                        "hu_type" : 10,
                        "left_cards" : [
                            17,
                            22,
                            23,
                            23,
                            5,
                            18,
                            3,
                            26,
                            9,
                            8,
                            9,
                            21,
                            7,
                            25,
                            1,
                            1,
                            18,
                            3,
                            19,
                            1,
                            7,
                            6,
                            2
                        ],
                        "lian_zhuang_count" : 2,
                        "players" : [
                            {
                                "avatar" : "http://188.188.1.202:20084/chess/chess_img/head/18353/1612041402586896.png",
                                "hand_cards" : [
                                    [ 21, 21 ],
                                    [ 2, 3 ],
                                    [ 23, 24 ],
                                    [ 7 ],
                                    [ 9, 10 ],
                                    [ 19, 26 ]
                                ],
                                "hu_xi" : -43,
                                "money" : 100054.0,
                                "name" : "v1▲",
                                "niao" : -1,
                                "niao_score" : 0,
                                "piao" : -1,
                                "piao_score" : 0,
                                "seatid" : 0,
                                "sex" : 1,
                                "total_score" : -43,
                                "uid" : 18353,
                                "weave_score" : -39,
                                "weaves" : [
                                    {
                                        "card_count" : 3,
                                        "card_list" : [ 6, 6, 22 ],
                                        "center_card" : 6,
                                        "weave_kind" : 8
                                    }
                                ]
                            },
                            {
                                "avatar" : "http://188.188.1.202:20084/chess/chess_img/head/default/00.jpg",
                                "hand_cards" : [
                                    [ 8, 8 ],
                                    [ 24, 24 ],
                                    [ 25, 25 ],
                                    [ 26, 26 ],
                                    [ 9, 10 ],
                                    [ 18, 19 ],
                                    [ 6, 22 ]
                                ],
                                "hu_xi" : -4,
                                "money" : 99963.0,
                                "name" : "wb17000000012",
                                "niao" : -1,
                                "niao_score" : 0,
                                "piao" : -1,
                                "piao_score" : 0,
                                "seatid" : 1,
                                "sex" : 2,
                                "total_score" : -4,
                                "uid" : 18354,
                                "weave_score" : 0
                            },
                            {
                                "avatar" : "http://188.188.1.202:20084/chess/chess_img/head/default/00.jpg",
                                "hand_cards" : [
                                    [ 1, 2, 3 ],
                                    [ 18, 19, 20 ],
                                    [ 22, 23, 24 ],
                                    [ 4, 5 ],
                                    [ 8, 10 ],
                                    [ 25 ]
                                ],
                                "hu_xi" : -4,
                                "money" : 99961.0,
                                "name" : "wb17000000015",
                                "niao" : -1,
                                "niao_score" : 0,
                                "piao" : -1,
                                "piao_score" : 0,
                                "seatid" : 2,
                                "sex" : 2,
                                "total_score" : -4,
                                "uid" : 18357,
                                "weave_score" : 0
                            },
                            {
                                "avatar" : "http://188.188.1.202:20084/chess/chess_img/head/18352/1612122325146723.png",
                                "hand_cards" : [
                                    [ 4, 4 ],
                                    [ 5, 5, 21 ],
                                    [ 7 ],
                                    [ 2, 10 ]
                                ],
                                "hu_xi" : 51,
                                "money" : 100022.0,
                                "name" : "战5渣(ง •̀_•́)ง",
                                "niao" : -1,
                                "niao_score" : 0,
                                "piao" : -1,
                                "piao_score" : 0,
                                "seatid" : 3,
                                "sex" : 2,
                                "total_score" : 51,
                                "uid" : 18352,
                                "weave_score" : 39,
                                "weaves" : [
                                    {
                                        "card_count" : 3,
                                        "card_list" : [ 17, 17, 17 ],
                                        "center_card" : 17,
                                        "weave_kind" : 4
                                    },
                                    {
                                        "card_count" : 3,
                                        "card_list" : [ 20, 20, 20 ],
                                        "center_card" : 20,
                                        "weave_kind" : 4
                                    }
                                ]
                            }
                        ],
                        "weaves" : [
                            {
                                "card_list" : [ 4, 4, 4 ],
                                "hu_xi" : 1,
                                "weave_kind" : 32
                            },
                            {
                                "card_list" : [ 2, 7, 10 ],
                                "hu_xi" : 3,
                                "weave_kind" : 8
                            },
                            {
                                "card_list" : [ 21, 5, 5 ],
                                "hu_xi" : 0,
                                "weave_kind" : 8
                            }
                        ],
                        "win_seatid" : 3
                    }
                );break;*/
                //self.handlerAckResultBC({"ack_code":1,"action_card":21,"cmd":6001,"hand_cards":[[1,1],[2,2,18],[24,24],[7,8,9],[20,21],[25,26],[3,5],[23]],"hu_xi":9,"remove_count":3,"seatid":2,"total_huxi":18});
               // self.handlerAckResultBC({"ack_code":1,"action_card":23,"cmd":6001,"hand_cards":[[1,1],[2,2,18],[24,24],[7,8,9],[20,21],[25,26],[3,5],[23]],"hu_xi":9,"remove_count":0,"seatid":2,"total_huxi":18});break;
              // self.handlerGameStartBC({});break;
                /*var d = {"seatid":utils.random(0,2)};
               self.handlerXiangGongBC(d);break;*/
              /*    var box = new PHZResultBox();
                self.addChild(box,10000);
                box.show([]);break;*/
              //  self.faPai();break;
              //  PHZCards.showPublicCard(0,INVAIL_CARD);
             //   PHZTips.showCoinTo(0,2);break;

              /*  self.chiBox.show(true);
                self.chiBox.showCards( [] );break;*/
             //   PHZTips.showWait(2);break;
                PHZAction.getUI("zhengli").setVisible(false);
                PHZModel.sendUpdateCard();
                break;
            case "outBtn":
                if(PHZCards.clickCard)
                {
                    PHZCards.checkOut(PHZCards.clickCard);
                }
                break;
            case "noniaoBtn":
                PHZModel.sendNiao(0);
                break;
            case "niaoBtn0":
                PHZModel.sendNiao(PHZModel.neiBetNums[0]);
                break;
            case "niaoBtn1":
                    PHZModel.sendNiao(PHZModel.neiBetNums[1]);
                break;
            case "niaoBtn2":
                PHZModel.sendNiao(PHZModel.neiBetNums[2]);
                break;
            case "niaoBtn3":
                PHZModel.sendNiao(PHZModel.neiBetNums[3]);
                break;
            case "nopiaoBtn":
                PHZModel.sendPiao(0);
                break;
            case "piaoBtn0":
                PHZModel.sendPiao(PHZModel.piaoBetNums[0]);
                break;
            case "piaoBtn1":
                PHZModel.sendPiao(PHZModel.piaoBetNums[1]);
                break;
            case "piaoBtn2":
                PHZModel.sendPiao(PHZModel.piaoBetNums[2]);
                break;
            case "piaoBtn3":
                PHZModel.sendPiao(PHZModel.piaoBetNums[3]);
                break;
        }

    },

    //*************************** 服务器返回信息处理 ************************************//
    //处理联网回调
    handlerCMD:function(data,isDelay)
    {
        var val={};// =   JSON.parse(data);//data.toJson();
        try{
            val = JSON.parse(data);
        }
        catch(e)
        {
            cc.log("_error__data:"+data);
            return;
        }

        PHZModel.fastShow = !isDelay;
        var cmd = val.cmd;
        cc.log("_r__cmd:"+cmd);
        cc.log("_r__data:"+data);
        PHZModel.lastHearbeatTime = (new Date).valueOf()/1000;
        //登录失败
        if(NetCMD.SERVER_DZ_LOGIN_ERR_RES == cmd)
        {
            ZJHModel.getInstance().mySeatid = -1;
            PHZModel.isGameOver = true;
            ZJHModel.getInstance().roomToShareView(PHZModel.curRoomID);
            return;
        }
        if(PHZModel.waitUpdateInfo && cmd !=NetCMD.SERVER_TABLE_INFO_UC)
        {
            return;
        }
        switch (cmd)
        {
            //心跳包
            case NetCMD.SERVER_HEART_BEAT_RESP:
                cc.log("SERVER_HEART_BEAT_RESP");
            {
                if(val.hasOwnProperty("time")&&val.hasOwnProperty("index"))
                {
                    var ms = utils.getTimeStamp()-  Number( val["time"]);
                    var mess= "index:"+val["index"]+ "  ms:"+ms;
                    if(ms>1000)
                    {
                        var dat = {};
                        dat["event"] ="102";
                        var d = {};
                        d["gameid"] =PHZModel.roomData["gameRoom"]["gameId"];
                        d["roomid"] = PHZModel.curRoomID;
                        d["roomCode"] = PHZModel.roomData["gameRoom"]["code"];
                        d["ms"] = ms;
                        d["cmd"] = cmd;
                        dat["content"] =JSON.stringify(d);
                        JsUtils.postNotifiStr("game_play_event",JSON.stringify(dat));
                    }
                    JsUtils.postNotifiStr("hear_show",mess);
                    cc.log(mess);
                }
            }
                break;
            //牌桌信息
            case NetCMD.SERVER_TABLE_INFO_UC:
                PHZModel.checkCMD(cmd);
                this.handlerTableInfoUC(val);
                break;
            //登录成功
            case NetCMD.SERVER_LOGIN_SUCC_UC:
                cc.log("登录成功");
                break;
            //登录成功
            case NetCMD.SERVER_LOGIN_SUCC_BC:
                this.handlerLoginSuccBC(val);
                break;
            //登录失败
            case NetCMD.SERVER_LOGIN_ERR_UC:
                cc.log("SERVER_LOGIN_ERR_UC");
                break;
            //登出成功
            case NetCMD.SERVER_LOGOUT_SUCC_BC:
                cc.log("SERVER_LOGOUT_SUCC_BC");
                PHZModel.isLogout=true;
                return;
            //
            case NetCMD.SERVER_UPTABLE_INFO_UC:
                cc.log("SERVER_UPTABLE_INFO_UC");
                break;
            //上桌成功
            case NetCMD.SERVER_UPTABLE_SUCCC_BC:
                this.handlerUptableSuccBC(val);
                break;
            //上桌失败
            case NetCMD.SERVER_UPTABLE_ERR_UC:
                this.handlerUptableErroUC(val);
                break;
            //下桌成功
            case NetCMD.SERVER_DOWNTABLE_SUCC_BC:
                this.handlerDowntableSuccBC(val);
                break;
            //准备成功
            case NetCMD.SERVER_READY_SUCC_BC:
                this.handlerReadySuccBC(val);
                break;
            //准备失败
            case NetCMD.SERVER_READY_ERR_UC:
                this.handlerReadyErroUC(val);
                break;
            //准备对局
            case NetCMD.SERVER_GAME_PREREADY_BC:
                this.handlerGamePrereadyBC(val);
                break;
            //对局结束，进行结算
            case NetCMD.SERVER_GAME_END_BC:
                this.handlerGameEndBC(val);
                break;
            //玩家掉线状态
            case NetCMD.SERVER_SERVER_PLAYER_OFFLINE_BC:
                this.handlerPlayerOfflineBC(val);
                break;
            //表情互动
            case NetCMD.SERVER_EMOTION_BC:
                this.handlerEmotionBC(val);
                break;
            //房间对局结束
            case NetCMD.SERVER_DZ_GAME_START_RES:
            case NetCMD.SERVER_PRE_END_GAME:
                this.handlerGameOverBC(val);
                break;
            //申请结束房间失败
            case NetCMD.SERVER_APPLY_DISSOLVE_ROOM_ERR_UC:
                this.handlerReqEndRoomErroUC(val);
                break;
            //进行投票通知
            case NetCMD.SERVER_APPLY_DISSOLVE_ROOM_SUCC_BC:
                this.handlerReqEndRoomSuccBC(val);
                break;
            //投票状态
            case NetCMD.SERVER_DISSOLVE_ACTION_SUCC_BC:
                this.handlerEndRoomActionBC(val);
                break;
            //投票结果
            case NetCMD.SERVER_DISSOLVE_ROOM_RESULT_BC:
                this.handlerEndRoomResultBC(val);
                break;
            //押注开始 内外围打鸟
            case NetCMD.SERVER_START_BET_BC:
                this.handlerStartBetBC(val);
                break;
            //停止外围押注 停止内外围打鸟
            case NetCMD.SERVER_STOP_BET_BC:
                this.handlerStopBetBC(val);
                break;
            //押注失败 打鸟
            case NetCMD.SERVER_BETTING_ERR_UC:
                this.handlerBetErrorUC(val);
                break;
            //押注成功 打鸟
            case NetCMD.SERVER_BETTING_SUCC_UC:
                this.handlerBetSucBC(val);
                break;

            //开始飘
            case NetCMD.SERVER_PHZ_START_PIAO:
                this.handlerStartPiaoBC(val);
                break;
            //飘成功
            case NetCMD.SERVER_PHZ_PIAO_SUCC:
                this.handlerPiaoSuccBC(val);
                break;
            //票失败
            case NetCMD.SERVER_PHZ_PIAO_ERR:
                this.handlerPiaoErrUC(val);
                break;
            //开始游戏
            case NetCMD.SERVER_GAME_START_BC:
                this.handlerGameStartBC(val);
                break;
            //发牌命令
            case NetCMD.SERVER_PHZ_SEND_CARD:
                this.handlerSendCardBC(val);
                break;
            //预操作响应
            case NetCMD.SERVER_PHZ_PRE_OPERATE_RES:
                this.handlerPreAckUC(val);
                break;
            //预操作通知
            case NetCMD.SERVER_PHZ_PRE_OPERATE_NOTIFY:
                this.handlerPreAckNotifyUC(val);
                break;
            //操作提示
            case NetCMD.SERVER_PHZ_OPERATE_NOTIFY:
                this.handlerAckUC(val);
                break;
            //操作响应
            case NetCMD.SERVER_PHZ_OPERATE_RES:
                PHZModel.checkCMD(cmd);
                this.handlerAckBackUC(val);
                break;
            //操作结果回应
            case NetCMD.SERVER_PHZ_OPERATE_CARD_RES:
                this.handlerAckResultBC(val);
                break;
            //更新弃牌记录
            case NetCMD.SERVER_PHZ_UPDATE_ABANDON_CARD:
                this.handlerUpdateHistroyBC(val);
                break;
            //出牌提示
            case NetCMD.SERVER_PHZ_OUT_CARD_NOTIFY:
                this.handlerOutCardBC(val);
                break;
            //用户出牌结果回应
            case NetCMD.SERVER_PHZ_OUT_CARD_RES:
                this.handlerOutCardResultBC(val);
                break;
            //交换扑克返回
            case NetCMD.SERVER_PHZ_CHANGE_CARD_RES:
                PHZModel.checkCMD(cmd);
                this.handlerChangeCardUC(val);
                break;
            //更新扑克返回
            case NetCMD.SERVER_PHZ_UPDATE_CARD_RES:
                PHZModel.checkCMD(cmd);
                this.handlerUpdateCardUC(val);
                break;
            //相公提示
            case NetCMD.SERVER_PHZ_XIANG_GONG:
                this.handlerXiangGongBC(val);
                break;
            //总结算
            case NetCMD.SERVER_PHZ_FINAL_END_RES:
                this.handlerOverBC(val);
                break;

        }
        PHZModel.fastShow = false;
    },
    //回调：房间信息
    handlerTableInfoUC:function(val) {
        cc.log("handlerTableInfoUC");
        PHZModel.waitUpdateInfo = false;
        PHZModel.reset();
        this.resetGame();
        PHZPlayers.downtable();

        if( PHZModel.isOnVideo )
        {
            PHZModel.seatID = 0;
            PHZModel.state = PHZState.GAME_PLAYING;
            PHZModel.dzSeatID = utils.getValInt(val, "banker");
            PHZModel.roomGolden = utils.getValInt(val, "take_in");

            PHZTips.showPlayType(utils.getValInt(val, "play_id"));
            PHZTips.showPlayTypes(utils.getValBool(val, "force_hu"),utils.getValBool(val, "zhong_zhuang"),utils.getValBool(val, "lian_zhuang"),utils.getValBool(val, "dai_kan"));

            PHZModel.fzUID = utils.getValInt(val, "room_user_id");
            if (val.hasOwnProperty("players")) {

                var len  = val["players"].length;
                for (var i = 0; i < len; ++i) {
                    var d = val["players"][i];
                    if(PHZModel.isMyUID(d["uid"]))
                    {
                        PHZModel.seatID = d["seatid"];
                        break;
                    }
                }
                for (var i = 0; i < len; ++i) {
                    var d = val["players"][i];
                    var player = PHZModel.updatePlayer(d);
                    PHZPlayers.uptable(player);
                    var pos = PHZModel.getPosBySeatID(player.seatid);
                    PHZPlayers.setFZ(pos,player.uid ==  PHZModel.fzUID);
                    PHZTips.showHuxi(pos,utils.getValInt(d, "hu_xi"));

                    if(d.hasOwnProperty("niao")) {
                        var niao = utils.getValInt(d, "niao");
                        PHZTips.showNiao(pos, niao);
                    }
                    if(d.hasOwnProperty("piao"))
                    {
                        var piao =utils.getValInt(d, "piao");
                        PHZTips.showPiao(pos,piao);
                    }
                }
            }
            return;
        }
        if(this.roomEndBox)
        {
            this.roomEndBox.removeFromParent(true);
            this.roomEndBox =null;
        }

        PHZModel.state = utils.getValInt(val, "state");
        PHZModel.seatID = utils.getValInt(val, "seatid");
        PHZModel.dzSeatID = utils.getValInt(val, "banker_user");
        PHZModel.curSeatID = utils.getValInt(val, "current_user");
        PHZModel.lastSeatID = utils.getValInt(val, "current_outcard_user");

        PHZModel.preTime = utils.getValInt(val, "operate_timer_stamp");


        PHZModel.roomGolden = utils.getValInt(val, "take_in");


        PHZTips.showPlayType(utils.getValInt(val, "play_id"));
        PHZTips.showPlayTypes(utils.getValBool(val, "force_hu"),utils.getValBool(val, "zhong_zhuang"),utils.getValBool(val, "lian_zhuang"),utils.getValBool(val, "dai_kan"));


        ZJHModel.getInstance().mySeatid = PHZModel.seatID;
        if(val.hasOwnProperty("niao_count"))
        {
            PHZModel.neiBetNums = val["niao_count"];
        }
        if(val.hasOwnProperty("piao_count"))
        {
            PHZModel.piaoBetNums = val["piao_count"];
        }
        if(val.hasOwnProperty("chicard_info"))
        {
            PHZCards.pushChiCards(val["chicard_info"]);
        }
        if(val.hasOwnProperty("listen_cards"))
        {
            PHZCards.showTing(val["listen_cards"]);
        }
        if(val.hasOwnProperty("huang_count"))
        {
            PHZTips.showDiFen(utils.getValInt(val, "base_money"),val["huang_count"]);
        }
        else
        {
            PHZTips.showDiFen(utils.getValInt(val, "base_money"),-1);
        }

        if(PHZModel.dzSeatID != INVAIL)
        {
            PHZTips.showZhuan(PHZModel.getPosBySeatID( PHZModel.dzSeatID),utils.getValInt(val, "lian_zhuang_count"));
        }

        //我方是否已上桌
        PHZAction.showUptableBtn(!PHZModel.isMyInTable());
        //上桌玩家信息
        PHZModel.fzUID = utils.getValInt(val, "room_user_id");
        var len = 0;
        if (val.hasOwnProperty("players")) {
            len = val["players"].length;
            for (var i = 0; i < len; ++i) {
                var d = val["players"][i];
                var player = PHZModel.updatePlayer(d);
                PHZPlayers.uptable(player);
                var pos = PHZModel.getPosBySeatID(player.seatid);

                player.isOffline = utils.getValInt(d, "offline");
                PHZPlayers.setOffline(pos,player.isOffline == 1);
                PHZPlayers.setFZ(pos,player.uid == PHZModel.fzUID);
                //恢复准备状态
                if (PHZModel.state == PHZState.GAME_FREE) {
                    PHZPlayers.setReady(pos, player.ready == 1);
                    if (player.ready != 1 && PHZModel.isMyUID(player.uid)) {
                        PHZAction.showReadyBtn(true);
                    }
                }
                //恢复组合牌
                if(d.hasOwnProperty("weaves"))
                {
                    PHZCards.pushShowCards(pos, d["weaves"]);
                    PHZCards.showShowCards(pos,pos!=0&&utils.getValBool(val, "is_first_card"));
                }


                if(PHZModel.state != PHZState.GAME_FREE) {
                    PHZTips.showHuxi(pos,utils.getValInt(d, "hu_xi"));
                    if (d.hasOwnProperty("abandon_cards")) {
                        PHZCards.historyCardsVal[pos] = d["abandon_cards"];
                        PHZCards.showHistoryCards(pos);
                    }
                    if(d.hasOwnProperty("niao")) {
                        var niao = utils.getValInt(d, "niao");
                        PHZTips.showNiao(pos, niao);
                        if (PHZModel.state == PHZState.GAME_NIAO &&PHZModel.isMyUID(player.uid)) {
                            PHZAction.showNiaoBtns(niao < 0);
                        }
                    }
                    if(d.hasOwnProperty("piao"))
                    {
                        var piao =utils.getValInt(d, "piao");
                        PHZTips.showPiao(pos,piao);
                        if(PHZModel.state == PHZState.GAME_PIAO&&PHZModel.isMyUID(player.uid))
                        {
                            PHZAction.showPiaoBtns(piao <0);
                        }
                    }
                    if(utils.getValBool(d, "xiang_goong"))
                    {
                        PHZTips.showXiangGong(pos);
                    }
                    if(utils.getValBool(d, "wufu_warn"))
                    {
                        PHZTips.showJb(pos,true);
                    }
                }
            }
        }
        if(len<4)
        {
            if(!PHZModel.isMyInTable())
            {
                PHZModel.sendUptable();
            }
           // PHZTips.showWaitTip("等待玩家上桌");
        }
        else
        {
            if(PHZModel.state == PHZState.GAME_FREE)
            {
                PHZTips.showWaitTip("等待玩家准备后，下局游戏开始");
            }
            JsUtils.postNotifi("notify_game_check_end");
        }
        PHZModel.sendGetJuShu();
        if(PHZModel.state == PHZState.GAME_PLAYING)
        {
            if(val.hasOwnProperty("hand_cards"))
            {
                PHZCards.handCardsVal = val["hand_cards"];
                PHZCards.showHandCards();
            }

            PHZAction.showUpdateBtn(true);
            //出牌恢复
            var out = utils.getValInt(val, "current_card");

            if(utils.getValInt(val, "is_first_card") == 1)
            {
              /*  PHZCards.showPublicCard(PHZModel.getPosBySeatID(PHZModel.dzSeatID)
                    ,utils.getValInt(val, "current_card"));*/
            }
            else
            {
                if(!val["card_operated"])
                {
                    PHZCards.showOutCard(PHZModel.getPosBySeatID(PHZModel.curSeatID),out,false,val["is_dispatch"]);
                }
            }

            PHZCards.showDunCards(utils.getValInt(val, "left_card_count"));

            PHZTips.showClock(PHZModel.getPosBySeatID(PHZModel.curSeatID),PHZModel.preTime);

            if(val["is_out_card"] == true&&PHZModel.isMySeatID(PHZModel.curSeatID))
            {
                PHZModel.needOutCard =true;
                PHZAction.showOutBtn(true);
                PHZCards.showNewbie(ZJHModel.getInstance().isGamePhzFrist);
                ZJHModel.getInstance().isGamePhzFrist = false;
                PHZTips.showClock(0,PHZModel.preTime);
            }
            else
            {
                if(val["user_action"]!=0)
                {
                    PHZAction.showAckBtns(!val["response"],val["user_action"]);
                    if(!val["response"])
                    {
                        PHZTips.showClock(0,PHZModel.preTime);
                    }
                    PHZModel.ackAble = utils.getValBool(val, "is_first_operate");
                    PHZTips.showWait( PHZModel.ackAble ? 0:1);
                    PHZModel.ackAble =false;
                }
            }
        }
        else if(PHZModel.state == PHZState.GAME_NIAO)
        {
            if( PHZTips.getNoNiaoPos()!=-1)
            {
                PHZTips.showClock(PHZTips.getNoNiaoPos(),PHZModel.preTime);
            }
        }
        else if(PHZModel.state == PHZState.GAME_PIAO)
        {
            if( PHZTips.getNoPiaoPos()!=-1)
            {
                PHZTips.showClock(PHZTips.getNoPiaoPos(),PHZModel.preTime);
            }
        }
        //恢复投票
        if (val.hasOwnProperty("dissolve_room_info") && val["dissolve_room_info"]["state"] == 1)
        {
            this.showEndRoom(val["dissolve_room_info"]);
        }
    },
    //广播：登录成功,掉线重连
    handlerLoginSuccBC:function(val)
    {
        cc.log("handlerLoginSuccBC");

        PHZModel.updatePlayer(val);
        //更新掉线提示

        var seatID =utils.getValInt(val,"seatid");
        var player = PHZModel.getPosBySeatID(seatID);
        player.isOffline = 0;
        if(seatID >=0 && seatID<=3)
        {
            var pos =PHZModel.getPosBySeatID(seatID);
            PHZPlayers.setOffline(pos,false);
        }
    },
    //广播：上桌成功
    handlerUptableSuccBC:function(val)
    {
        cc.log("handlerUptableSuccBC");
        var player = PHZModel.updatePlayer(val);
        if(PHZModel.isMyUID(player.uid))
        {
            PHZModel.sendRoomInfo();
            PHZModel.sendReady();
            PHZTips.showMyTip("您已上桌");
        }
        else
        {
            PHZPlayers.uptable(player);
        }
        JsUtils.postNotifi("notify_room_check_ip");
    },
    //回调：上桌失败
    handlerUptableErroUC:function(val)
    {
        cc.log("handlerUptableErroUC");
        if(!PHZModel.isMyInTable())
        {
            PHZTips.showMyTip("上桌失败");
        }
    },
    //广播：下桌成功
    handlerDowntableSuccBC:function(val)
    {
        cc.log("handlerDowntableSuccBC");
        var seatID = utils.getValInt(val,"seatid");
        if(seatID>-1)
        {
            var pos = PHZModel.getPosBySeatID(seatID);
            PHZPlayers.downtable(pos);
        }

        if(PHZModel.isMySeatID(seatID))
        {
            PHZModel.unDownSeatID =PHZModel.seatID;
            PHZModel.seatID = -1;
            ZJHModel.getInstance().mySeatid = PHZModel.seatID;
            PHZAction.showUptableBtn(true);
            PHZAction.showReadyBtn(false);
            PHZAction.showUpdateBtn(false);
            PHZTips.showMyTip("您已下桌");
        }
    },

    //回调：准备成功
    handlerReadySuccBC:function(val)
    {
        cc.log("handlerReadySuccBC");
        var uid = utils.getValInt(val,"uid");
        var seatid = utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatid);
        PHZPlayers.setReady(pos,true);
        if(PHZModel.isMyUID(uid))
        {
            PHZAction.showReadyBtn(false);
        }
        var player = PHZModel.getPlayerBySeatID(seatid);
        if(player)
        {
            player.ready =1;
        }
    },
    //回调：准备失败
    handlerReadyErroUC:function(val)
    {
        cc.log("handlerReadyErroUC");
        var player = PHZModel.getPlayerByUID(ZJHModel.getInstance().uid);
        if(!PHZModel.isMyInTable() &&player&&player.ready!=1 )
        {
            PHZTips.showMyTip("准备失败");
        }
    },

    //广播：玩家表情互动
    handlerEmotionBC:function(val)
    {
        cc.log("handlerEmotionBC");
        var base = utils.getValInt(val,"seatid");
        var target = utils.getValInt(val,"target_seatid");
        var face = utils.getValInt(val,"type");
        if(face != -1 && target!=-1 && base != target &&  !PHZModel.isMySeatID(base) )
        {
            var b = PHZPlayers.getPosition(PHZModel.getPosBySeatID(base));
            var t  =PHZPlayers.getPosition(PHZModel.getPosBySeatID(target));

            PHZTips.showBigface(b,t,face,PHZPlayers.getSex(PHZModel.getPosBySeatID(base)));
        }
    },

    //广播：房间对局结束
    handlerGameOverBC:function(val) {
        cc.log("handlerGameOverBC");
        PHZModel.isGameOver = true;
        PHZModel.sendOver();

    },

    //回调：申请结束房间失败
    handlerReqEndRoomErroUC:function(val)
    {
        cc.log("handlerReqEndRoomErroUC");
        var code = utils.getValInt(val,"code");
        if (code == 101)
        {
            PlatformHelper.showToast("每个玩家每局游戏只能申请两次解散房间！");
        }
        else if (code == 102)
        {
            PlatformHelper.showToast("只有桌子上的玩家可以申请解散房间！");
        }
        else if (code == 103)
        {
            PlatformHelper.showToast("当前有人正在申请解散房间！");
        }

    },
    //广播：申请结束房间成功
    handlerReqEndRoomSuccBC:function(val)
    {
        cc.log("handlerReqEndRoomSuccBC");
        this.showEndRoom(val);

    },
    //广播：投票状态
    handlerEndRoomActionBC:function(val)
    {
        cc.log("handlerEndRoomActionBC");
        var player = PHZModel.getPlayerByUID(val["uid"]);
        if(!player)
        {
            return;
        }

        if(this.roomEndBox)
        {
            this.roomEndBox.updateState(player.uid,val["action"]);
        }
    },
    //广播：投票结果
    handlerEndRoomResultBC:function(val)
    {
        cc.log("handlerEndRoomResultBC");
        if(this.roomEndBox)
        {
            this.roomEndBox.removeFromParent(true);
        }
        this.roomEndBox = null;

        var result =val["result"];
        if (result == 1)
        {
          //  PlatformHelper.showToast("房间解散成功，3秒后房间自动结束");
        }
        else
        {
            PlatformHelper.showToast("解散失败，稍后游戏继续！");
        }

    },
    //广播：玩家掉线情况
    handlerPlayerOfflineBC:function(val) {
        cc.log("handlerPlayerOfflineBC");
        var seatID = utils.getValInt(val,"seatid");
        var player = PHZModel.getPlayerBySeatID(seatID);
        if(player)
        {
            player.isOffline = 1;
            if(seatID >-1)
            {
                var  pos = PHZModel.getPosBySeatID(seatID);
               PHZPlayers.setOffline(pos,true);
            }
        }
    },
    //广播：准备开始新游戏
    handlerGamePrereadyBC:function(val)
    {
        cc.log("handlerGamePrereadyBC");
        this.resetGame();
        JsUtils.postNotifi("notify_game_check_end");
        PHZModel.sendGetJuShu();
        PHZModel.isFaPai = true;
        PHZTips.showStart();
        this.runAction(cc.sequence(cc.delayTime(2.6),cc.callFunc(function(){
            PHZModel.isFaPai = false;
        })));
    },
    //广播：此局游戏结束，进入结算
    handlerGameEndBC:function(val)
    {
        cc.log("handlerGameEndBC");

        var self = this;
        PHZModel.state = PHZState.GAME_END;
        PHZTips.showAllTip("");
        PHZTips.showMyTip("");
        PHZTips.hideClock();
        PHZAction.reset();
        this.chiBox.show(false);

        var winID= utils.getValInt(val,"win_seatid",-1);
        var myWin =PHZModel.isMySeatID(winID);

        for(var i in val["players"])
        {
            var d = val["players"][i];
            var seatID = utils.getValInt(d,"seatid");
            var pos = PHZModel.getPosBySeatID(seatID);
            var player = PHZModel.getPlayerBySeatID(seatID);
            if(!player)
            {
                continue;
            }
            player.money = utils.getValInt(d,"money");
            if(PHZModel.isMySeatID(seatID))
            {
                player.ready =0;
            }
            PHZPlayers.updateInfo(pos);
            if(d.hasOwnProperty("weave_score"))
            {
                PHZTips.showHuNum(pos,d["weave_score"]);
            }
        }

        var type = utils.getValInt(val,"end_type");

        if(type == 1)
        {
            var num = 0;
            var winPos =PHZModel.getPosBySeatID(winID);
            var huType = utils.getValInt(val, "hu_type");
            PHZTips.showActionTip(winPos,PHZAck.ACK_HU,huType);
            if(val.hasOwnProperty("dianpao_user"))
            {
                var id = val["dianpao_user"];
                for(var i in val["players"])
                {
                    var d = val["players"][i];
                    var seatID = utils.getValInt(d,"seatid");
                    if(id ==  seatID)
                    {
                        var pos = PHZModel.getPosBySeatID(seatID);
                        num = val["players"][i]["total_score"] -PHZTips.getHuxi(pos);
                        break;
                    }
                }
                var paoPos = PHZModel.getPosBySeatID(val["dianpao_user"]);
                PHZTips.showActionTip(paoPos,PHZAck.ACK_DIAN_PAO);
                var dt = PHZTips.showCoinTo(paoPos,winPos,num);
                PHZTips.showCoinSound(dt);
            }
            else
            {
                var dt = 0;
                for(var i in val["players"])
                {
                    var d = val["players"][i];
                    var seatID = utils.getValInt(d,"seatid");
                    if(winID !=  seatID)
                    {
                        var pos = PHZModel.getPosBySeatID(seatID);
                        var dnum = val["players"][i]["total_score"] -PHZTips.getHuxi(pos);
                        num = Math.max(Math.abs(dnum),num);
                        dt =  Math.max(PHZTips.showCoinTo(pos,winPos,dnum),dt);
                    }
                }
                PHZTips.showCoinSound(dt);
            }

            switch(huType)
            {
                case 4:
                case 5:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    PHZTips.showYH();
            }
        }
        else
        {
            PHZModel.getPlayerByPos(0).ready =0;
            PHZTips.showHz(true);

        }

        PHZTips.showHuxi(0, 0);
        PHZTips.showHuxi(1, 0);
        PHZTips.showHuxi(2, 0);
        PHZTips.showHuxi(3, 0);

        if(val.hasOwnProperty("huang_count"))
        {
            PHZTips.showHzNum(val["huang_count"]);
        }
        if( PHZModel.isOnVideo )
        {
            self.removeChildByTag(666);
            this.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){

                self.removeChildByTag(666);
                var box = new PHZResult();
                self.addChild(box,2000,666);
                box.show(val);

                if(myWin)
                {
                    Sound.getInstance().playEffect(utils.format("%1/res/sound/win.mp3",PackName));
                }
                else{

                    Sound.getInstance().playEffect(utils.format("%1/res/sound/loss.mp3",PackName));
                }
            })));
            return;
        }
        this.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
            var box = new PHZResultBox();
            self.addChild(box,2000,666);
            box.show(val);

            if(myWin)
            {
                Sound.getInstance().playEffect(utils.format("%1/res/sound/win.mp3",PackName));
            }
            else{

                Sound.getInstance().playEffect(utils.format("%1/res/sound/loss.mp3",PackName));
            }
        })));
        this.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
            PHZTips.showWaitTip("等待玩家准备后，下局游戏开始");
        })));

    },
    //广播：押注开始 内外围打鸟
    handlerStartBetBC:function(val) {
        cc.log("handlerStartBetBC");
        PHZModel.state =utils.getValInt(val,"state");
        PHZModel.dzSeatID =utils.getValInt(val,"banker");
        PHZTips.showZhuan(PHZModel.getPosBySeatID(PHZModel.dzSeatID),utils.getValInt(val, "lian_zhuang_count"));
        PHZAction.showNiaoBtns(true);

        PHZTips.showClock(0,PHZModel.preTime);
    },
    //广播：停止外围押注 停止内外围打鸟
    handlerStopBetBC:function(val) {
        cc.log("handlerStopBetBC");
        PHZAction.showNiaoBtns(false);
    },
    //回调：押注失败 打鸟
    handlerBetErrorUC:function(val) {
        cc.log("handlerBetErrorUC");
        cc.log("打鸟失败");
        PHZAction.showNiaoBtns(false);
    },
    //回调：押注成功 打鸟
    handlerBetSucBC:function(val) {
        cc.log("handlerBetSucBC");
        PHZModel.state =utils.getValInt(val,"state");
       var seatID= utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatID);
        if( PHZModel.isMySeatID(seatID))
        {
            PHZAction.showNiaoBtns(false);
        }
        PHZTips.showNiao(pos,utils.getValInt(val,"niao"));
        PHZTips.hideClock();
        if( PHZTips.getNoNiaoPos()!=-1)
        {
            PHZTips.showClock(PHZTips.getNoNiaoPos(),PHZModel.preTime);
        }
    },

    //广播：开始飘
    handlerStartPiaoBC:function(val) {
        cc.log("handlerStartPiaoBC");
        PHZModel.state =utils.getValInt(val,"state");
        if( PHZModel.dzSeatID==-1)
        {
            PHZModel.dzSeatID =utils.getValInt(val,"banker");
            PHZTips.showZhuan(PHZModel.getPosBySeatID(PHZModel.dzSeatID),utils.getValInt(val, "lian_zhuang_count"));
        }
        PHZModel.dzSeatID =utils.getValInt(val,"banker");
        PHZAction.showPiaoBtns(true);
        PHZTips.showClock(0,PHZModel.preTime);
    },
    //广播：飘成功
    handlerPiaoSuccBC:function(val) {
        cc.log("handlerPiaoSuccBC");
        PHZModel.state =utils.getValInt(val,"state");
        var seatID= utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatID);
        if( PHZModel.isMySeatID(seatID))
        {
            PHZAction.showPiaoBtns(false);
        }
        PHZTips.showPiao(pos,utils.getValInt(val,"piao"));
        PHZTips.hideClock();
        if( PHZTips.getNoPiaoPos()!=-1)
        {
            PHZTips.showClock(PHZTips.getNoPiaoPos(),PHZModel.preTime);
        }
    },
    //回调：飘失败
    handlerPiaoErrUC:function(val) {
        cc.log("handlerPiaoErrUC");
        PHZAction.showPiaoBtns(false);
    },
    //广播：开始游戏
    handlerGameStartBC:function(val) {
        cc.log("handlerGameStartBC");
      //  val = {"banker":0,"banker_card":17,"cmd":4009,"hand_cards":[[4,4,20],[6,6,22],[10,10],[18,18,2],[19,19],[21,21],[23,23],[25,25],[17,24]],"left_card_count":19,"total_huxi":6};
      //  this.resetGame();

        var seatID = utils.getValInt(val,"banker");
        PHZModel.dzSeatID = seatID;

        if(PHZModel.isOnVideo)
        {
            PHZCards.showDunCards(utils.getValInt(val, "left_card_count"));
            if(!PHZModel.fastShow)
            {
                PHZCards.showPublicCard(pos,utils.getValInt(val, "banker_card"));
            }
            for(var i in val["players"])
            {
                var d = val["players"][i];
                var sID =d["seatid"];
                var pos = PHZModel.getPosBySeatID(sID);
                if(d.hasOwnProperty("hand_cards"))
                {
                    PHZCards.videoHandCardsVal[pos] = d["hand_cards"];
                    PHZCards.showVideoHandCards(pos);
                }
                PHZTips.showZhuan(PHZModel.getPosBySeatID(PHZModel.dzSeatID),utils.getValInt(val, "lian_zhuang_count"));
            }
            return;
        }
        if(val.hasOwnProperty("hand_cards"))
        {
            PHZCards.handCardsVal = val["hand_cards"];
        }
        this.isDZ = true;

        var pos = PHZModel.getPosBySeatID(PHZModel.dzSeatID);
        PHZModel.isFaPai = true;
       // this.faPai();

        PHZCards.showHandCards();
        PHZCards.showMyHandCard();
        PHZCards.showDunCards(utils.getValInt(val, "left_card_count"));
        this.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function() {
            if(val.hasOwnProperty("banker_card"))
            {
                PHZCards.showPublicCard(pos,utils.getValInt(val, "banker_card"));
            }
            else
            {
                PHZCards.showPublicCard(pos,INVAIL_CARD);
            }
        })));
        this.runAction(cc.sequence(cc.delayTime(4),cc.callFunc(function(){
            PHZModel.isFaPai = false;
            if(  PHZModel.state  != PHZState.GAME_NIAO&&PHZModel.state  != PHZState.GAME_PIAO)
            {
                PHZTips.showZhuan(pos,utils.getValInt(val, "lian_zhuang_count"));
            }

            PHZModel.state = PHZState.GAME_PLAYING;
            PHZAction.showUpdateBtn(true);
            PHZTips.showHuxi(0,0);
            PHZTips.showHuxi(1,0);
            PHZTips.showHuxi(2,0);
            PHZTips.showHuxi(3,0);
            PHZTips.showClock(pos,PHZModel.preTime);
            if(val.hasOwnProperty("listen_cards"))
            {
                PHZCards.showTing(val["listen_cards"]);
            }
            Sound.getInstance().playEffect(utils.format("%1/res/sound/%2/%3_pai_%4.mp3",PackName,PHZModel.soundIndex,PHZPlayers.getSex(pos),utils.getValInt(val, "banker_card")));
        })));

    },

    faPai:function()
    {
        var cs = [];
        for(var i =0;i<80;++i)
        {
            var c = new cc.Sprite(utils.spriteFrame("phz/card_bg_01.png"));
            this.uiNode.addChild(c);
            cs.push(c);
        }
        for(var i =0;i<80;++i)
        {
            var c = cs[i];
            var d = i%2;
            if(d == 0)
            {
                c.setPosition(0,410+0.5*i);
            }
            else
            {
                c.setPosition(1280,410+0.5*i);
            }
            c.setRotation(90);
            c.setLocalZOrder(100+i);
        }

        var poses =[ cc.p(63,66),cc.p(1217,560),cc.p(550,670),cc.p(63,560)];
        for(var i =79;i>=23;--i)
        {
            (function(i)
            {
                var a = -1;
                if(i%2 == 0)
                {
                    a=1;
                }
                var d = i%4;
                var c = cs[i];
                c.runAction(cc.sequence(cc.moveBy(0.1,640*a,0),cc.rotateBy(i*0.00625,2.25*i),cc.delayTime(0.5+(80-i)*0.015),cc.callFunc(function(){
                    var dis= c.getPosition();
                    cc.pSubIn(dis,poses[d]);
                    var r = 90-Math.atan2(dis.y,dis.x)*180/Math.PI;
                    c.setRotation(r);
                    Sound.getInstance().playEffect(utils.format("%1/res/sound/send_card.mp3",PackName));
                }),cc.moveTo(0.1,poses[d]),cc.removeSelf()));
            })(i);
        }
        for(var i =0;i<23;++i)
        {
            var c = cs[i];
            c.runAction(cc.sequence(cc.moveBy(0.1,640,0),cc.rotateBy(i*0.00625,2.25*i),cc.delayTime(0.5+(80-i)*0.015),cc.rotateBy((23-i)*0.005,-2.25*i)));
            c.runAction(cc.sequence(cc.delayTime(2),cc.removeSelf()));
        }
    },
    //广播：牌墩发牌
   handlerSendCardBC:function(val) {
       cc.log("handlerSendCardBC");
       PHZModel.state=PHZState.GAME_PLAYING;

       var seatID= utils.getValInt(val,"seatid");
       var pos = PHZModel.getPosBySeatID(seatID);
       var card = utils.getValInt(val, "card");

       PHZCards.showDunCards(utils.getValInt(val, "left_card_count"));

       if(PHZModel.isOnVideo) {
           if (val.hasOwnProperty("to_seatid")) {
               if (!PHZModel.fastShow) {
                   PHZCards.showPublicCard(pos, card);
               }
           }
           else {
               PHZCards.showOutCard(pos, card, !PHZModel.fastShow, true);
           }
           if (!PHZModel.fastShow)
           {
               Sound.getInstance().playEffect(utils.format("%1/res/sound/%2/%3_pai_%4.mp3", PackName, PHZModel.soundIndex, PHZPlayers.getSex(pos), card));
           }
           return;
       }

       PHZModel.curSeatID = seatID;
       PHZCards.showDunCards(utils.getValInt(val, "left_card_count"));

       if(val.hasOwnProperty("to_seatid"))
       {
           if(PHZModel.isMySeatID(PHZModel.curSeatID)) {
               PHZCards.hideTing();
               if (val.hasOwnProperty("listen_cards")) {
                   PHZCards.showTing(val["listen_cards"]);
               }
               if(val.hasOwnProperty("hand_cards"))
               {
                   PHZCards.handCardsVal = val["hand_cards"];
                   PHZCards.showHandCards();
               }
           }
           PHZCards.showPublicCard(pos,card);
       }
       else
       {
           PHZCards.showOutCard(pos,card,true,true);
       }

       this.isDZ = false;

       PHZTips.showClock(pos,PHZModel.preTime);
       if(card!=0  )
       {

           if(PHZModel.isMySeatID(PHZModel.curSeatID))
           {
               var weis = [];
               for(var i in  PHZCards.handCards)
               {
                   if( PHZCards.handCards[i].value == card)
                   {
                       weis.push(card);
                   }
               }
               if(weis.length == 2)
               {
                   return;
               }
           }
           Sound.getInstance().playEffect(utils.format("%1/res/sound/%2/%3_pai_%4.mp3",PackName,PHZModel.soundIndex,PHZPlayers.getSex(pos),card));
       }
   },

    //回调：预操作
    handlerPreAckUC:function(val) {
        cc.log("handlerPreAckUC");

        PHZModel.ackAble = utils.getValBool(val,"can_operate");
        PHZTips.showWait(PHZModel.ackAble?0:1);
        var ack = utils.getValInt(val,"operate_type");
        PHZAction.showAckBtns(true,ack);
        if(PHZModel.ackAble)
        {
            if(ack==PHZAck.ACK_PENG)
            {
                PHZModel.sendAck(PHZAck.ACK_PENG);
            }
            else  if(ack==PHZAck.ACK_CHI)
            {
                if(PHZCards.chiVal.length == 1
                    && !PHZCards.chiVal[0].hasOwnProperty("second_info"))
                {
                    PHZModel.sendAck(PHZAck.ACK_CHI,PHZCards.chiVal[0]["chi_kind"] );
                }
                else
                {
                    if(this.chiBox.isVisible())
                    {
                        this.chiBox.reSend();
                    }
                    else
                    {
                        this.chiBox.show(true);
                        this.chiBox.showCards( PHZCards.chiVal );
                    }
                }
            }
            else if(ack==PHZAck.ACK_HU)
            {
                PHZModel.sendAck(PHZAck.ACK_HU);
            }
        }
        else
        {
            this.chiBox.show(false);
        }

    },
    //回调：预操作通知
    handlerPreAckNotifyUC:function(val) {
        cc.log("handlerPreAckNotifyUC");

        if(PHZTips.waitTip.isVisible())
        {
            PHZTips.showWait(2);
        }
    },
    //回调：需要操作
    handlerAckUC:function(val) {
        cc.log("handlerAckUC");

        if( PHZModel.state!=PHZState.GAME_PLAYING)
        {
            return;
        }

        PHZAction.showAckBtns(true,val["operate_type"]);
        if(val.hasOwnProperty("chicard_info"))
        {
            PHZCards.pushChiCards(val["chicard_info"]);
        }
        PHZTips.showClock(0,PHZModel.preTime);
        PHZModel.ackAble =false;
    },
    //回调：操作回应
    handlerAckBackUC:function(val) {
        cc.log("handlerAckBackUC");
        PHZAction.showAckBtns(false);
        PHZAction.showOutBtn(false);
        PHZModel.needOutCard=false;
        PHZCards.showNewbie(false);
        PHZCards.clickCard = null;
        this.chiBox.show(false);
        PHZModel.ackAble = false;
        PHZTips.showWait(0);
    },
    //广播：操作结果
    handlerAckResultBC:function(val) {
        cc.log("handlerAckResultBC");

        var seatID= utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatID);
        var ack =utils.getValInt(val,"ack_code");

        if(PHZModel.isOnVideo)
        {
            PHZCards.videoHandCardsVal[pos] = val["hand_cards"];
            PHZCards.showVideoHandCards(pos);

            PHZCards.pushShowCards(pos,val["weaves"]);
            PHZCards.showShowCards(pos);

            for(var i in val["players"])
            {
                var d = val["players"][i];
                var id = d["seatid"];
                var p = PHZModel.getPosBySeatID(id);
                var n = d["weave_score"];
                if(n>0)
                {
                    num = n;
                }
                if(!PHZModel.fastShow) {
                    PHZTips.showHuNum(p, n);
                }
                PHZTips.showHuxi(p,utils.getValInt(d, "hu_xi"));
            }

            if(!PHZModel.fastShow) {

                PHZTips.showActionTip(pos,ack);
                if((ack == PHZAck.ACK_PAO|| ack == PHZAck.ACK_TI)&&PHZCards.isBaKuai(pos))
                {
                    Sound.getInstance().playEffect(utils.format("%1/res/sound/bakuai.mp3",PackName));
                }
                var dt = 0;
                for(var i in val["players"])
                {
                    var d = val["players"][i];
                    var id = d["seatid"];
                    var p = PHZModel.getPosBySeatID(id);
                    var n = d["weave_score"];

                    if(n<0)
                    {
                        dt =Math.max(dt,PHZTips.showCoinTo(p,pos,n));
                    }
                }
                PHZTips.showCoinSound(dt);
            }
            var c = utils.getValInt(val,"action_card");

            if(!(ack == PHZAck.ACK_PENG && val["weaves"][val["weaves"].length-1]["card_list"].length == 2))
            {
                PHZCards.showAckCardsBack(pos,c);
            }
            return;
        }

        PHZModel.ackAble = false;
        PHZTips.showWait(0);
        PHZAction.showAckBtns(false);
        var tipEx =0;
        if(ack != PHZAck.ACK_CHI)
        {
            var pwType = utils.getValInt(val,"pengwei_type");
            var sID = -1;
            var num = 0;
            for(var i in val["players"])
            {
                var d = val["players"][i];
                var id = d["seatid"];
                var p = PHZModel.getPosBySeatID(id);
                var n = d["weave_score"];
                if(n>0)
                {
                    num = n;
                }
                PHZTips.showHuNum(p,n);
                PHZTips.showHuxi(p,utils.getValInt(d, "hu_xi"));
            }

            var dt = 0;
            for(var i in val["players"])
            {
                var d = val["players"][i];
                var id = d["seatid"];
                var p = PHZModel.getPosBySeatID(id);
                var n = d["weave_score"];

                if(n<0)
                {
                    dt =Math.max(dt,PHZTips.showCoinTo(p,pos,n));
                }
            }
            PHZTips.showCoinSound(dt);
            var cs =[];
            if(val["chou_wei"])
            {
                ack = PHZAck.ACK_CW;
            }
            var c = INVAIL_CARD;
            if(val.hasOwnProperty("source_seatid")) {
                sID = val["source_seatid"];
            }
                if(val.hasOwnProperty("action_card"))
            {
                c = utils.getValInt(val,"action_card");
                cs.push(PHZCards.pushShowCards1(pos,c,ack,utils.getValInt(val,"remove_count")==0,sID));
            }
            else
            {
                cs.push(PHZCards.pushShowCards1(pos,INVAIL_CARD,ack,utils.getValInt(val,"remove_count")==0,sID));
            }

            PHZCards.showShowCards(pos,pos!=0&&utils.getValBool(val,"first_card"));
            PHZCards.showAckCards(pos,cs,c);
            PHZTips.showActionTip(pos,ack,pwType);

        }
        else
        {
            if(val.hasOwnProperty("chi_results")) {
                var cs =[];
                var c = val["action_card"];
                for (var i in val["chi_results"]) {
                    cs.push(PHZCards.pushShowCards2(pos, val["chi_results"][i],c));
                }
                PHZCards.showShowCards(pos);
                PHZCards.showAckCards(pos,cs,c);

                if(val["chi_results"].length >1)
                {
                    tipEx = 1;
                }
            }
            PHZTips.showActionTip(pos,ack,tipEx);
        }

        if(PHZModel.isMySeatID(seatID))
        {
            PHZCards.hideTing();
            if(val.hasOwnProperty("listen_cards"))
            {
                PHZCards.showTing(val["listen_cards"]);
            }
            if(val.hasOwnProperty("hand_cards"))
            {
                PHZCards.handCardsVal = val["hand_cards"];
            }
            else
            {
                PHZCards.handCardsVal =[];
            }
            PHZCards.showHandCards();
        }


        this.chiBox.show(false);

        if(!((ack == PHZAck.ACK_PAO|| ack == PHZAck.ACK_TI|| ack == PHZAck.ACK_WEI)&&this.isDZ))
        {
            PHZTips.showClock(pos,PHZModel.preTime);
        }
        if((ack == PHZAck.ACK_PAO|| ack == PHZAck.ACK_TI)&&PHZCards.isBaKuai(pos))
        {
            Sound.getInstance().playEffect(utils.format("%1/res/sound/bakuai.mp3",PackName));
        }
    },
    //广播：历史记录
    handlerUpdateHistroyBC:function(val) {
        cc.log("handlerUpdateHistroyBC");
        var seatID= utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatID);
        var c = utils.getValInt(val,"card");
        if(val.hasOwnProperty("to_seatid"))
        {
            var tPos = PHZModel.getPosBySeatID(val["to_seatid"]);

            if(PHZModel.isOnVideo)
            {
                PHZCards.historyCardsVal[pos] = val["abandon_cards"];
            }
            else
            {
                PHZCards.popHistoryCards(pos,c);
            }
            PHZCards.pushShowCards3(tPos,c);

            if(!PHZModel.fastShow)
            {
                PHZCards.showOutHistoryCard(pos,tPos,c);
                this.runAction(cc.sequence(cc.delayTime(0.3),cc.callFunc(function(){
                    PHZCards.showHistoryCards(pos);
                    PHZCards.showShowCards(tPos);
                })));
            }
            else
            {
                PHZCards.showHistoryCards(pos);
                PHZCards.showShowCards(tPos);
            }
        }
        else
        {
            if(PHZModel.isOnVideo)
            {
                PHZCards.historyCardsVal[pos] = val["abandon_cards"];
            }
            else {
                PHZCards.pushHistoryCards(pos, c);
            }
            if(!PHZModel.fastShow) {
                PHZCards.showInHistoryCard(pos,c);
                this.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                    PHZCards.showHistoryCards(pos);
                })));
            }
            else
            {
                PHZCards.showHistoryCards(pos);
            }
        }
    },
    //广播：出牌提示
    handlerOutCardBC:function(val) {
        cc.log("handlerOutCardBC");
        if( PHZModel.state!=PHZState.GAME_PLAYING)
        {
            return;
        }
        var seatID= utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatID);
        if(PHZModel.isMySeatID(seatID)) {
            cc.log("需要出牌");
            PHZModel.needOutCard=true;

            PHZAction.showOutBtn(true);
            PHZCards.showNewbie(ZJHModel.getInstance().isGamePhzFrist);
            ZJHModel.getInstance().isGamePhzFrist = false;
            PHZCards.hideTing();
        }
        this.isDZ = false;
    },
    //广播：出牌结果
    handlerOutCardResultBC:function(val) {
        cc.log("handlerOutCardResultBC");
        var seatID= utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatID);
        var card = val["out_card"];


        if(PHZModel.isOnVideo)
        {
            PHZCards.showMyOutCard(pos,null,card);

            if(val.hasOwnProperty("hand_cards")) {
                PHZCards.videoHandCardsVal[pos] = val["hand_cards"];
                PHZCards.showVideoHandCards(pos);
            }

            if (!PHZModel.fastShow)
            {
                Sound.getInstance().playEffect(utils.format("%1/res/sound/%2/%3_pai_%4.mp3", PackName, PHZModel.soundIndex, PHZPlayers.getSex(pos), card));
            }
            if(val.hasOwnProperty("wufu_warn"))
            {
                PHZTips.showJb(pos,true);
            }
            if(utils.getValBool(val,"first_card"))
            {
                PHZCards.showShowCards(0);
                PHZCards.showShowCards(1);
                PHZCards.showShowCards(2);
                PHZCards.showShowCards(3);
            }
            return;
        }

        if(pos == 0 && PHZCards.clickCard)
        {
        }
        else
        {
            PHZCards.showMyOutCard(pos,null,card);
        }
        PHZModel.needOutCard=false;
        PHZAction.showOutBtn(false);
        PHZCards.showNewbie(false);

        if(val.hasOwnProperty("hand_cards"))
        {
            var isHand = JSON.stringify(  PHZCards.handCardsVal ) != JSON.stringify(  val["hand_cards"]);

            if(pos == 0 && PHZCards.clickCard)
            {
                if(isHand)
                {
                    PHZCards.showMyOutCard(pos, PHZCards.clickCard);
                }
            }
            this.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function()
            {
                if(isHand) {
                    PHZCards.handCardsVal = val["hand_cards"];
                    PHZCards.showHandCards();
                }
            })));
        }
        PHZCards.clickCard = null;

        if(PHZModel.isMySeatID(seatID)) {
            PHZCards.hideTing();
            if (val.hasOwnProperty("listen_cards")) {
                PHZCards.showTing(val["listen_cards"]);
            }
            PHZModel.checkCMD(val["cmd"]);
        }
        if(val.hasOwnProperty("wufu_warn"))
        {
            PHZTips.showJb(pos,true);
        }
        if(utils.getValBool(val,"first_card"))
        {
            PHZCards.showShowCards(0);
            PHZCards.showShowCards(1);
            PHZCards.showShowCards(2);
            PHZCards.showShowCards(3);
        }

        PHZTips.showClock(pos,PHZModel.preTime);
        Sound.getInstance().playEffect(utils.format("%1/res/sound/%2/%3_pai_%4.mp3",PackName,PHZModel.soundIndex,PHZPlayers.getSex(pos),card));
    },
    //回调：换牌结果
    handlerChangeCardUC:function(val) {
        cc.log("handlerChangeBC");
        if(val.hasOwnProperty("hand_cards"))
        {
            if(JSON.stringify(  PHZCards.handCardsVal ) != JSON.stringify(  val["hand_cards"]))
            {
                PHZCards.handCardsVal = val["hand_cards"];
                PHZCards.showHandCards();
            }
        }
        Sound.getInstance().playEffect(utils.format("%1/res/sound/update_cards.mp3",PackName));

    },
    //回调：更新牌结果
    handlerUpdateCardUC:function(val) {
        cc.log("handlerUpdateCardBC");

        if(val.hasOwnProperty("hand_cards"))
        {
            PHZCards.handCardsVal = val["hand_cards"];
            PHZCards.showHandCards();
        }
        Sound.getInstance().playEffect(utils.format("%1/res/sound/update_cards.mp3",PackName));
    },
    //广播：相公提示
    handlerXiangGongBC:function(val) {
        cc.log("handlerXiangGongBC");
        var seatID= utils.getValInt(val,"seatid");
        var pos = PHZModel.getPosBySeatID(seatID);
        PHZTips.showXiangGong(pos);
    },
//广播：总结算提示
handlerOverBC:function(val) {
    cc.log("handlerOverBC");

    if( this.getChildByName("over"))
    {
        return;
    }
    this.removeChildByTag(666);
    PHZTips.hideClock();
   var box = new PHZOver();
    box.show(val);
    this.addChild(box,100000);
}
});