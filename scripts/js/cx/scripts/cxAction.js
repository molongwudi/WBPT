var CXAction =
{
    uiNode:null,
    clickCB:null,
    btnCenter:null,
    outBtns:[],

    outButtonPosition:[],

    readyBtn:null,

    init:function()
    {
        if(this.uiNode == null)
        {
            return;
        }

        this.btnCenter = cc.p(360,220);

        this.outButtonPosition.push(cc.p(88,215));
        this.outButtonPosition.push(cc.p(195,112));
        this.outButtonPosition.push(cc.p(360,70));
        this.outButtonPosition.push(cc.p(525,112));
        this.outButtonPosition.push(cc.p(632,215));

        this.outBtns.push(this.getUI("btn_diu"));
        this.outBtns.push(this.getUI("btn_xiu"));
        this.outBtns.push(this.getUI("btn_gen"));
        this.outBtns.push(this.getUI("btn_da"));
        this.outBtns.push(this.getUI("btn_qiao"));

        this.readyBtn = this.getUI("btn_ready");
        this.getUI("btn_gen").getChildByName("num").ignoreContentAdaptWithSize(true);

        this.addUIClickEvt("btn_diu");
        this.addUIClickEvt("btn_xiu");
        this.addUIClickEvt("btn_gen");
        this.addUIClickEvt("btn_da");
        this.addUIClickEvt("btn_qiao");
        this.addUIClickEvt("btn_ready");

        this.reset();
    },


    reset:function()
    {
        if(this.uiNode == null)
        {
            return;
        }

    this.showUIs(this.outBtns,false);
    
    this.readyBtn.setVisible(false);

    },
    addUIClickEvt:function(key)
    {
        var self = this;
        var ui= this.getUI(key);
        if(ui) {
            ui.addClickEventListener(function (sender, evt) {

                if(self.clickCB)
                {
                    self.clickCB(key);
                }

            });
        }
    },
    showBtnEnable:function(key,is)
    {
        this.getUI(key).getChildByName("enable").setVisible(is);
        this.getUI(key).setEnabled(!is);
    },
    getUI:function(key)
    {
        return this.uiNode.getChildByName(key);
    },
    showUI:function(key ,is)
    {
        var ui= this.getUI(key);
        if(ui)
        {
            ui.setVisible(is);
        }
        else{
            cc.log("ui erro :"+key);
        }
    },

    showUIs:function(list,is)
    {
        for(var i in list)
        {
            list[i].setVisible(is);
        }
    },
    //排序按钮
    sortBtns:function(btns)
    {
        var size = cc.director.getWinSize();

        utils.sortNodes(btns,size.width*0.5,300,5);
    },

    sortotherBtns:function(btns)
    {
        var size = cc.director.getWinSize();

        utils.sortNodes(btns,size.width*0.5,200,5);
    },

    showBtnEnable:function(key,vi)
    {
        this.getUI(key).setEnabled(vi);
    },

    setGenValue:function(bet)
    {
         this.getUI("btn_gen").getChildByName("num").setString(bet);
    },

    showOutCardBtns:function()
    {
        var useBtns = this.outBtns;
        var centerposition = this.btnCenter;
        var outBtnPosition = this.outButtonPosition;

        var rebackButton = cc.callFunc(function(){
            var leng = useBtns.length;
                    for(var i in useBtns)
                    {
                        if(useBtns[i].getPosition().x != centerposition.x && useBtns[i].getPosition().y != centerposition.y)
                        {
                            (function(btn)
                            {
                                    var  func = cc.callFunc(function () {
                                        btn.setVisible(false);
                                    });
                                 btn.runAction(cc.sequence(cc.delayTime(0.05),func,
                                    cc.moveTo(0.15,centerposition),cc.delayTime(0.05),cc.callFunc(function(){
                                        btn.setVisible(false);
                                    })
                                    ))
                            })(useBtns[i])
                        }
                    }
                });
        var delayt = cc.delayTime(0.5);

        var outAllButton = cc.callFunc(function(){
                    for(var i in useBtns)
                    {
                        useBtns[i].setVisible(true);
                        useBtns[i].runAction(cc.sequence(cc.delayTime(0.1),
                            cc.moveTo(0.15, outBtnPosition[i])
                            ))
                       
                    }
                });
        this.uiNode.runAction(cc.sequence(rebackButton,delayt,outAllButton));
    },

    showOutCardBtnsSigle:function()
    {
        var useBtns = this.outBtns;
        var centerposition = this.btnCenter;
        var outBtnPosition = this.outButtonPosition;
        
         var outAllButton = cc.callFunc(function(){
                    for(var i in useBtns)
                    {
                        useBtns[i].setVisible(true);
                        useBtns[i].runAction(cc.sequence(cc.delayTime(0.05),
                            cc.moveTo(0.15, outBtnPosition[i])
                            ))
                       
                    }
                });
        this.uiNode.runAction(cc.sequence(outAllButton));
    },

    hideOutCardBtns:function()
    {
        var useBtns = this.outBtns;
        var centerposition = this.btnCenter;

       var rebackButton = cc.callFunc(function(){
                    for(var i in useBtns)
                    {
                        if(useBtns[i].getPosition().x != centerposition.x || useBtns[i].getPosition().y != centerposition.y)
                        {
                            (function(btn)
                            {
                                var  func = cc.callFunc(function () {
                                        btn.stopAllActions();
                                        btn.setVisible(false);
                                    });
                                 btn.runAction(cc.sequence(cc.delayTime(0.05),func,
                                    cc.moveTo(0.15,centerposition),cc.delayTime(0.05),cc.callFunc(function(){
                                        btn.setVisible(false);
                                    })
                                    ))
                            })(useBtns[i])
                        }
                    }
                });
        this.uiNode.runAction(cc.sequence(rebackButton));
    },

    hideOutCardBtnsSingle:function()
    {
        var useBtns = this.outBtns;
        var centerposition = this.btnCenter;

       var rebackButton = cc.callFunc(function(){
                    for(var i in useBtns)
                    {
                        if(useBtns[i].getPosition().x != centerposition.x || useBtns[i].getPosition().y != centerposition.y)
                        {
                            (function(btn)
                            {
                                 btn.runAction(cc.sequence(cc.moveTo(0.05,centerposition),cc.delayTime(0.05),cc.callFunc(function(){
                                        btn.setVisible(false);
                                    })
                                    ))
                            })(useBtns[i])
                        }
                    }
                });
        this.uiNode.runAction(cc.sequence(rebackButton));
    },

    
    showTuoGuanBtn:function(is)
    {
        this.showUI("tuoguanBtn",is);
        this.showUI("uptableBtn",!is);
    },

    showReadyBtn:function(is)
    {
        this.showUI("btn_ready",is);
    },

};
