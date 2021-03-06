
var CXCard = cc.Node.extend(
    {
        uiNode: null,
        value:-1,

        ctor:function ()
        {
            this._super();
            var json = ccs.load(PackName+"/res/card.json");
            this.uiNode =json.node;
            this.addChild(this.uiNode);
            this.setContentSize(this.uiNode.getContentSize());
            this.setAnchorPoint(cc.p(0.5,0.5));
            this.reset();
        },

        getUI:function(key)
        {
            return this.uiNode.getChildByName(key);
        },
        showUI:function(key ,is)
        {
            this.getUI(key).setVisible(is);
        },
        //设置牌点数
        setValue:function(value)
        {
            this.value = value;
            if(value == -1)
            {
                this.getUI("card").loadTexture("CX/card_00.png",1);
            }
            else
            {
                this.getUI("card").loadTexture("CX/card_"+utils.toHex2(value)+".png",1);
            }
        },

        getValue:function()
        {
            return this.value;
        },

        setTOpacity:function(value)
        {
            this.uiNode.setOpacity(value);
        },

        reset:function()
        { 
            this.setValue(-1);
            this.setScale(1);
            this.setVisible(false);
            this.stopAllActions();
            this.uiNode.setOpacity(255);
        },

    });

var CXCards =
{
    uiNode:null,

    beginFPCardX:0,
    beginFPCardY:0,
    endFPCardX:0,
    endFPCardY:0,
    winSize:null,

    player_num:6,
    player_cards:4,
    player_cards_type:3,

    cardNums:0,

    sureBankerAllCard:[],

    init:function()
    {
        if(this.uiNode == null)
        {
            return;
        }
        this.winSize = cc.director.getWinSize();
        this.beginFPCardX = this.winSize.width/2;
        this.beginFPCardY = this.winSize.height + 240;

        this.endFPCardX = this.winSize.width/2;
        this.endFPCardY = this.winSize.height/2 + 150;

        this.createBeginCard();

        this.createCard();
        this.resetCard();

        this.reset();
    },

    reset:function()
    {
        this.player_num = 6;
        this.player_cards = 4;
        this.sureBankerAllCard = [];
        this.cardNums = 0;

        this.hideAllCard();
        this.removeAllGoldKuang();
        this.removeFinishCPFlag();
    },

    createCard:function()
    {
        for(var i = 0;i < this.player_num; i++)
        {
            for(var j = 0;j < this.player_cards; j++)
            {

                log("=======create=====all==========createCard=")
                card = new CXCard();
                card.setTag(CardTagUM.ALLCARDBEGIN + this.player_cards*i+j);
                card.setValue(-1);
                this.uiNode.addChild(card);
            }
        }
    },

    //重置位置
    resetCard:function()
    {
        for(var i = 0;i < this.player_num; i++)
        {
            for(var j = 0;j < this.player_cards; j++)
            {
                var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*i+j);
                card.reset();
                var players = utils.findNode(this.uiNode.getParent(),"players");
                card.setPosition(utils.getCardPos(players,i,j));
            }
        }
    },

    hideAllCard:function()
    {
        for(var i = 0;i < this.player_num; i++)
        {
            for(var j = 0;j < this.player_cards; j++)
            {
                var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*i+j);
                card.reset();
            }

          var cardTypeBg_1 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*i + 0);
          if(cardTypeBg_1)
          {
            cardTypeBg_1.removeAllChildren();
            this.uiNode.removeChild(cardTypeBg_1);
          }

          var cardTypeBg_2 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*i + 1);
          if(cardTypeBg_2)
          {
            cardTypeBg_2.removeAllChildren();
            this.uiNode.removeChild(cardTypeBg_2);
          }

          var cardTypeBg_3 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*i + 2);
          if(cardTypeBg_3)
          {
            cardTypeBg_3.removeAllChildren();
            this.uiNode.removeChild(cardTypeBg_3);
          }

        }
    },

    SetOpacityCardForPos:function(pos)
    {
        for(var j = 0;j < this.player_cards; j++)
        {
             var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*pos+j);
             if(card != null)
             {
                card.setTOpacity(100);
             }
        }


        var cardTypeBg_1 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + 0);
          if(cardTypeBg_1 != null)
          {
            cardTypeBg_1.setOpacity(100);
          }

          var cardTypeBg_2 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + 1);
          if(cardTypeBg_2 != null)
          {
             cardTypeBg_2.setOpacity(100);
          }

          var cardTypeBg_3 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + 2);
          if(cardTypeBg_3 != null)
          {
             cardTypeBg_3.setOpacity(100);
          }

    },

    hideCardForPos:function(pos)
    {
        for(var j = 0;j < this.player_cards; j++)
        {
             var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*pos+j);
             card.reset();
        }

          var cardTypeBg_1 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + 0);
          if(cardTypeBg_1)
          {
            cardTypeBg_1.removeAllChildren();
            this.uiNode.removeChild(cardTypeBg_1);
          }

          var cardTypeBg_2 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + 1);
          if(cardTypeBg_2)
          {
            cardTypeBg_2.removeAllChildren();
            this.uiNode.removeChild(cardTypeBg_2);
          }

          var cardTypeBg_3 = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + 2);
          if(cardTypeBg_3)
          {
            cardTypeBg_3.removeAllChildren();
            this.uiNode.removeChild(cardTypeBg_3);
          }
    },

    removeAllGoldKuang:function()
    {
        for(var i = 0;i < this.player_num; i++)
        {
            for(var j = 0;j < this.player_cards; j++)
            {
                var gkuang = this.uiNode.getChildByTag(CardTagUM.CARDGOLDKENG + this.player_cards*i+j);
                if(gkuang)
                {
                    this.uiNode.removeChild(gkuang);
                }
            }
        }
    },

    removeGoldKuangForPos:function(pos,index)
    {
        var gkuang = this.uiNode.getChildByTag(CardTagUM.CARDGOLDKENG + this.player_cards*pos+index);
        if(gkuang)
        {
            this.uiNode.removeChild(gkuang);
        }             
    },

    removeFinishCPFlag:function()
    {
        for(var i = 0;i < this.player_num; i++)
        {
            var cpfinish = this.uiNode.getChildByTag(CardTagUM.CHEPAIFINISH + i);
            if(cpfinish)
            {
                this.uiNode.removeChild(cpfinish);
            }
        }
    }, 

    removeFinishCPForPos:function(pos)
    {
       var cpfinish = this.uiNode.getChildByTag(CardTagUM.CHEPAIFINISH + pos);
        if(cpfinish)
        {
            this.uiNode.removeChild(cpfinish);
        }
    }, 

    HideCardsAndRemoveTip:function(pos)
    {
        for(var i =0;i<4;i++)
        {
            this.removeGoldKuangForPos(pos,i);
        }
        
        this.hideCardForPos(pos);
    },

    createBeginCard:function()
    {
        var card = null;
        card = new CXCard();
        card.setTag(100);
        card.setValue(-1);
        card.setVisible(false);
        card.setPosition(cc.p(this.beginFPCardX,this.beginFPCardY));
        this.uiNode.addChild(card); 

        var zang = cc.Sprite("CX/zang.png");
        zang.setTag(101);
        zang.setVisible(false);
        zang.setPosition(cc.p(this.beginFPCardX,this.beginFPCardY));
        this.uiNode.addChild(zang); 
    },

    fapaibegin:function(flag)
    {
       var card = this.uiNode.getChildByTag(100);
       if(card != null)
       {    
        log("card============card============card=================");
            card.setVisible(true);
            var move = cc.moveTo(0.2,cc.p(this.endFPCardX,this.endFPCardY));
            card.runAction(cc.sequence(move));
       }

       // if(flag)
       // {
       //     var zang = this.uiNode.getChildByTag(101);
       //     if(zang)
       //     {
       //          zang.setVisible(true);
       //          var cm = cc.moveTo(0.2,cc.p(this.endFPCardX,this.endFPCardY));
       //          zang.runAction(cm);
       //     }
       // }
    },

    fapaiend:function()
    {
        var card = this.uiNode.getChildByTag(100);
        if(card != null)
        {   
            this.cardNums = 0;
            var self = this;
            var move = cc.moveTo(0.3,cc.p(this.beginFPCardX,this.beginFPCardY));
            var end_cl = cc.callFunc(function(){
                    card.setVisible(false);
                });
            card.runAction(cc.sequence(move,end_cl));
        }
    },

    showCards:function(pos,index,delay)
    {
        if(index >= 4)
        {
            return;
        }
        this.cardNums++;
        var beginpos = cc.p(this.endFPCardX,this.endFPCardY);

        var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*pos+index);
        if(card == null)
        {
            return;
        }
        card.setValue(-1);


        (function(card,spos,self){
                        var endpos = card.getPosition();
                        card.setPosition(spos);
                        

                        var show_card = cc.callFunc(function(){
                                  card.setVisible(true);
                                });
                        var carddelay = cc.delayTime(delay);
                        var cardMove = cc.moveTo(0.1,endpos);
                        var card_sound = cc.callFunc(function(){
                                  Sound.getInstance().playEffect(PackName+"/res/sound/com/fapai.mp3"); 
                                });
                        var cardFadeIn = cc.FadeIn(0.1);
                        var card_cend = cc.callFunc(function(){
                                   self.cardNums--;
                                   if(self.cardNums <= 0)
                                   {
                                    self.fapaiend();
                                   }
                                });
                        card.runAction(cc.sequence(carddelay,show_card,cardMove,card_sound,cardFadeIn,card_cend));
         }) (card,beginpos,this);



        
    },

    showSureBankerCard:function(pos,index,delay,value,callback)
    {
        this.cardNums++;
        var beginpos = cc.p(this.endFPCardX,this.endFPCardY);

        var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*pos+index);
        card.setValue(-1);

        var endpos = card.getPosition();
        card.setPosition(beginpos);
        card.setVisible(true);

        var carddelay = cc.delayTime(delay);
        var cardMove = cc.moveTo(0.2,endpos);

        this.sureBankerAllCard[pos] = value;
        var card_sound = cc.callFunc(function(){
                   
                });
        var cardFadeIn = cc.FadeIn(0.1);
        var card_cend = cc.callFunc(function(){
                   this.cardNums--;
                   if(this.cardNums == 0)
                   {
                        this.fapaiend();
                        var delay = cc.delayTime(0.2);
                        var show_card = cc.callFunc(function(){
                        var length = this.player_num;
                            for(var i = 0;i<length;i++)
                            {
                                if(this.sureBankerAllCard[i] != 0)
                                {
                                    this.showCardValue(i,1,0.1,this.sureBankerAllCard[i]);
                                }
                            }
                         });

                       var show_z = cc.callFunc(function(){
                            var z_seat = CXModel.dealer;
                            var z_pos = CXModel.getPosBySeatID(z_seat);
                            var _pos = CXPlayers.players[z_pos].getzangPos();
                            var zang = this.uiNode.getChildByTag(101);

                            var move = cc.moveTo(0.8,_pos);
                            var card_ends= cc.callFunc(function(){
                                zang.setVisible(false);
                                zang.setPosition(cc.p(this.beginFPCardX,this.beginFPCardY));
                             });
                            zang.runAction(cc.sequence(move,cc.delayTime(0.5),card_ends));
                        });

                        this.uiNode.runAction(cc.sequence(delay,show_card,delay));
                   }
                });

        card.runAction(cc.sequence(carddelay,cardMove,card_sound,cardFadeIn,card_cend));
    },

    addChePaiFinish:function(pos)
    {
        var ft = this.uiNode.getChildByTag(CardTagUM.CHEPAIFINISH + pos);
        if(ft == null)
        {
             var finishT = cardType = cc.Sprite(utils.spriteFrame("CX/cp_finish.png"));
            var players = utils.findNode(this.uiNode.getParent(),"players");
            var posi = utils.getCardPos(players,pos,2);
            cc.pAddIn(posi,cc.p(-5,0));
            finishT.setPosition(posi);
            finishT.setTag(CardTagUM.CHEPAIFINISH + pos);
            this.uiNode.addChild(finishT);
        }
       
    },

    showCardValue:function(pos,index,delay,value)
    {
        var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*pos+index);
        if(card.getValue() == -1)
        {
            (function(card,va){
                        card.stopAllActions();
                        card.setVisible(true);
                        card.runAction(cc.sequence(cc.delayTime(delay),cc.scaleTo(0.05,0.2,1),cc.callFunc(function(){
                        Sound.getInstance().playEffect(PackName+"/res/sound/com/open_card.mp3"); 
                        card.setValue(va);
                    }),cc.scaleTo(0.1,1,1)));
                                })(card,value);
        }
        else
        {
            
            (function(card,va){
                        card.stopAllActions();
                        card.setVisible(true);
                        card.runAction(cc.sequence(cc.callFunc(function(){
                        Sound.getInstance().playEffect(PackName+"/res/sound/com/open_card.mp3"); 
                        card.setValue(va);
                    }) ));
                                })(card,value);
        }
        
    },

     showCardValueAndPos:function(pos,index,delay,value)
    {
        var card = this.uiNode.getChildByTag(CardTagUM.ALLCARDBEGIN + this.player_cards*pos+index);
        var players = utils.findNode(this.uiNode.getParent(),"players");
        var position = utils.getSplitCardPos(players,pos,index);
        
        if(card.getValue() == -1)
        {
            
            (function(card,pos,va){
                        card.setVisible(true);
                        card.setPosition(pos);
                        card.runAction(cc.sequence(cc.delayTime(delay),cc.scaleTo(0.05,0.2,1),cc.callFunc(function(){
                        Sound.getInstance().playEffect(PackName+"/res/sound/com/open_card.mp3"); 
                        card.setValue(va);
                    }),cc.scaleTo(0.1,1,1)));
                                })(card,position,value);
        }
        else
        {
            (function(card,pos,va){
                        card.setVisible(true);
                        card.setPosition(pos);
                        card.runAction(cc.sequence(cc.callFunc(function(){
                        Sound.getInstance().playEffect(PackName+"/res/sound/com/open_card.mp3"); 
                        card.setValue(va);
                    }) ));
                                })(card,position,value);
        }
        
    },

    removeSpeCardType:function(pos,index)
    {
        var cardTypeBg = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + index);
        if(cardTypeBg)
        {
          cardTypeBg.removeAllChildren(true);
          this.uiNode.removeChild(cardTypeBg);
          cardTypeBg = null;
        }
    },


    showCardType:function(pos,index,type,flag)
    {

        if(type < 0)
        {
            return;
        }
        var vs = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + index);
        if(vs)
        {
          return;
        }

        var players = utils.findNode(this.uiNode.getParent(),"players");
        var cardTypeBg = cc.Sprite(utils.spriteFrame("CX/dn_cardTypebg.png"));
        var position;
        if(index == 0 || index == 1 )
        {
            position = utils.getSplitCardPos(players,pos,index*2);
            cc.pAddIn(position,cc.p(15,-40));
        }else{
            position = utils.getSplitCardPos(players,pos,1);
            if(pos == 0 || pos == 1 ||pos == 2 ||pos == 3)
            {
                cc.pAddIn(position,cc.p(85,-40));
            }else{
                cc.pAddIn(position,cc.p(15,-40));
            }
            
        }
         
        cardTypeBg.setTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + index);
        cardTypeBg.setPosition(position);

        var cardType = null;
        if(flag)
        {
            cardType = cc.Sprite(utils.spriteFrame("CXCardType/jin/"+type+".png"));
        }
        else
        {
            cardType = cc.Sprite(utils.spriteFrame("CXCardType/yin/"+type+".png"));
        }
        
        cardType.setAnchorPoint(cc.p(0.5, 0.5));
        var bgsize = cardTypeBg.getContentSize();
        cardType.setPosition(cc.p(bgsize.width/2,bgsize.height/2));
        cardTypeBg.addChild(cardType);

        if(flag && index != 2)
        {

            var gold = this.uiNode.getChildByTag(CardTagUM.CARDGOLDKENG + this.player_cards_type*pos + index);
            if(gold)
            {
              this.uiNode.removeChild(gold);
            }

            var gold_round = cc.Sprite(utils.spriteFrame("CX/card_gold.png"));
            gold_round.setScale(1.2);
            var gold_round_pos = utils.getSplitCardPos(players,pos,index*2);
            cc.pAddIn(gold_round_pos,cc.p(17,0));
            gold_round.setTag(CardTagUM.CARDGOLDKENG + this.player_cards_type*pos + index);
            gold_round.setPosition(gold_round_pos);
            gold_round.setLocalZOrder(-1);
            this.uiNode.addChild(gold_round);
        }

        this.uiNode.addChild(cardTypeBg);
        
    },

    //改变状态
    changePlayerCardState:function(pos,index,type,flag)
    {
        var players = utils.findNode(this.uiNode.getParent(),"players");
        var cardTypeBg = null;
        cardTypeBg = this.uiNode.getChildByTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + index);

        var gold = this.uiNode.getChildByTag(CardTagUM.CARDGOLDKENG + this.player_cards_type*pos + index);
        if(gold)
        {
            this.uiNode.removeChild(gold);
        }

         if(cardTypeBg != null)
         {
            cardTypeBg.removeAllChildren(true);
            this.uiNode.removeChild(cardTypeBg);
            cardTypeBg = null;
         }

        
         
        cardTypeBg = cc.Sprite(utils.spriteFrame("CX/dn_cardTypebg.png"));
        var  position = utils.getSplitCardPos(players,pos,index*2);
        cc.pAddIn(position,cc.p(15,-40));
        cardTypeBg.setTag(CardTagUM.ALLCARDTYPEBEGIN + this.player_cards_type*pos + index);
        cardTypeBg.setPosition(position);
         

         var cardType = null;
            if(flag)
            {
                cardType = cc.Sprite(utils.spriteFrame("CXCardType/jin/"+type+".png"));
            }
            else
            {
                cardType = cc.Sprite(utils.spriteFrame("CXCardType/yin/"+type+".png"));
            }
            
            cardType.setAnchorPoint(cc.p(0.5, 0.5));
            var bgsize = cardTypeBg.getContentSize();
            cardType.setPosition(cc.p(bgsize.width/2,bgsize.height/2));
            cardTypeBg.addChild(cardType);

            if(flag)
            {

                var gold_round = cc.Sprite(utils.spriteFrame("CX/card_gold.png"));
                gold_round.setScale(1.2);
                var gold_round_pos = utils.getSplitCardPos(players,pos,index*2);
                cc.pAddIn(gold_round_pos,cc.p(17,0));
                gold_round.setTag(CardTagUM.CARDGOLDKENG + this.player_cards_type*pos + index);
                gold_round.setPosition(gold_round_pos);
                gold_round.setLocalZOrder(-1);
                this.uiNode.addChild(gold_round);
            }
        this.uiNode.addChild(cardTypeBg);
    },


    //收牌－－－盖牌
    reverseAllCards:function(pos,delay)
    {
        (function(pos,delay,self)
        {
            var players = utils.findNode(self.uiNode.getParent(),"players");
            var Tnode = self.uiNode;
            var allCards = self.player_cards;
            Tnode.runAction(cc.sequence(cc.delayTime(delay),cc.callFunc(function(){
                         var length = CXModel.otherPlayCards[pos].length + 2;
                            for(var i = 0;i < length;i++)
                            {
                                var card = Tnode.getChildByTag(CardTagUM.ALLCARDBEGIN + allCards*pos + i);
                                if(card != null)
                                {
                                    var position = utils.getSplitCardPos(players,pos,i);
                                    card.setVisible(true);
                                    card.setPosition(position);
                                    if(card.getValue() != -1)
                                    {
                                        (function(card){
                                        card.runAction(cc.sequence(cc.scaleTo(0.2,0.2,1),cc.callFunc(function(){
                                                card.setValue(-1);
                                            }),cc.scaleTo(0.1,1,1) ));
                                        })(card);
                                    }
                                }
                            }
                        }) ));
        })(pos,delay,this);
    },


    //取出牌
    newCard:function()
    {
        for(var i in this.cardPool)
        {
            if(!this.cardPool[i].isVisible())
            {
                return this.cardPool[i];
            }
        }

        var card = new CXCard();
        this.uiNode.addChild(card);
        this.cardPool.push(card);
        return card;
    },


};

