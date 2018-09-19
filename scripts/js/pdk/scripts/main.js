/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */


var PackName = ZJHModel.getInstance().packName;
if(PackName=="")
{
    PackName = "pdk";
}
var getSrcPath = function (v) {
    return PackName + "/scripts/" + v;
};

var getResPath = function (v) {
    return PackName + "/res/" + v;
};
require(getSrcPath("protobuf/Long.js"));
require(getSrcPath("protobuf/ByteBufferAB.js"));
require(getSrcPath("protobuf/ProtoBuf.js"));
var ProtoBuf = dcodeIO.ProtoBuf;
var files = ["proto/CommonInfo.proto",
    "proto/GameInfo.proto"];
var Build = null;

for (var i = 0; i < files.length; i++) {
    var file = getSrcPath(files[i]);
    Build = ProtoBuf.loadProto(jsb.fileUtils.getStringFromFile(file), Build, file);
}
require(getSrcPath("Base64.js"));
require(PackName+"/scripts/utils.js");
require(PackName+"/scripts/ddzCMD.js");
require(PackName+"/scripts/libddz/card.js");
require(PackName+"/scripts/libddz/cards.js");
require(PackName+"/scripts/libddz/cardsParse.js");
require(PackName+"/scripts/libddz/cardsFind.js");
require(PackName+"/scripts/ddzModel.js");
require(PackName+"/scripts/ddzScene.js");
require(PackName+"/scripts/ddzCards.js");
require(PackName+"/scripts/ddzAction.js");
require(PackName+"/scripts/ddzPlayers.js");
require(PackName+"/scripts/ddzPlayerChat.js");
require(PackName+"/scripts/ddzTips.js");
require(PackName+"/scripts/ddzDialogs.js");
require(PackName+"/scripts/ddzOver.js");
require(PackName+"/scripts/ddzVideo.js");
require(PackName+"/scripts/ddzTable.js");

cc.game.onStart = function(){
    
    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
    
    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    ZJHModel.getInstance().hallToRoomV();
    //load resources
    cc.LoaderScene.preload({}, function () {
        cc.director.replaceScene(new DDZScene());
    }, this);
};
cc.game.run();