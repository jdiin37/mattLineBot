var linebot = require('linebot');
var express = require('express');
var functionPool = require('./myLib/fucntionPool');


var bot = linebot({
  channelId: 1633532932,
  channelSecret: "48cd941e2dfa02378ac35b22f13d96d7",
  channelAccessToken: "aewswqqjsMoz9s0Aw8VePSimZwKm8u6vugPt1n8Kv5x/8BMJdXWf5yiZEPvpPwSfTjQrg02wnwjT7EeJnQlIj/wS3s+f8RHat7zZE1qaNAdlab/wunz7oxFeN1U/3C/jnrDkZKMauMRgSczGNcjJJAdB04t89/1O/w1cDnyilFU="
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
app.get('/', function(req, res) {
  res.send('hello ngrok');
});


//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});



var userId ="";

var myTimeOut;
var countSum = 0;

var ModType = '';

var x = Math.floor(Math.random() * 99) + 1;
var intMax = 100;
var intMin = 0;
var leaveCount = 5;
var PWDGame_startMsg = "終極密碼" + intMin+"~" + intMax+",還可猜" + leaveCount + "次";

var PWDGame = function(pwd){
  
  var rtnMsg = '';
  if (pwd <= intMin || pwd >= intMax || isNaN(pwd))
  {
      rtnMsg = "請輸入介於" + intMin + "~" + intMax + "之間的數";      
  }

  if (pwd > x) {
      intMax = pwd;
      leaveCount-- ;
      rtnMsg = PWDGame_startMsg;
  }
  if (pwd < x) {
      intMin = pwd;
      leaveCount-- ;
      rtnMsg = PWDGame_startMsg;
  }

  if (pwd == x) {
      rtnMsg = "恭喜答對了";
  }
    
  return rtnMsg;
}

var isOnhour = function (){  
  myTimeOut = setTimeout(function(){    
      if(functionPool.isOnhour()){
        countSum += 1;
        var sendMsg = countSum + '隻羊..';
        bot.push(userId,sendMsg);
        console.log('send: '+sendMsg);
      }
      isOnhour();      
    },5000);
}

bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看

    userId = event.source.userId;
    console.log("userID : " + userId);
});
  
bot.on('message', function(event) {
    var GotIt = false;
    if (event.message.type = 'text') {
      var msg = event.message.text.toLowerCase() ;
      var replyMsg = '"' + msg + '?"' + functionPool.showIAmGroot(); 
      
      if(ModType == 'PWD'){
        if(msg.indexOf('exitPWD') != -1){
          GotIt = true;
          ModType = '';
          replyMsg = "已離開終極密碼-------";
          bot.push(userId,replyMsg);           
        }

        if (isNaN(msg)) {
          GotIt = true;
          bot.push(userId,PWDGame(msg));  
        }else{
          GotIt = true;
          replyMsg = "請輸入數字";
          bot.push(userId,replyMsg);           
        }

      }else{
        if (msg.indexOf('playPWD') != -1) {
          GotIt = true;
          ModType = 'PWD'              
          bot.push(userId,"開始玩終極密碼!!-------");
          bot.push(userId,PWDGame_startMsg); 
        }


        if (msg.indexOf('time') != -1) {
          GotIt = true;
          bot.push(userId,functionPool.checkTime());              
        }
  
        if (msg.indexOf('search') != -1){
          //replyMsg = functionPool.googleSearch();
          GotIt = true;
          bot.push(userId,"你要搜尋什麼?");
        }
  
        if(msg.indexOf('start') != -1){
          GotIt = true;
          bot.push(userId,"開始!!");
          isOnhour();
        }
  
  
        if(msg.indexOf('reset') != -1){
          GotIt = true;
          countSum = 0 ;
          bot.push(userId,"重新設定完成!!");
        }
        
        if(msg.indexOf('stop') != -1){
          GotIt = true;
          bot.push(userId,"停止!!");
          clearTimeout(myTimeOut);
        }
      }



      if(!GotIt){
        event.reply(replyMsg).then(function(data) {
          // success 
          console.log(replyMsg);
        }).catch(function(error) {
          // error 
          console.log('error');
        });
      }

    }
  });






