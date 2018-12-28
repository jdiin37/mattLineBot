var linebot = require('linebot');
var express = require('express');
var fs = require('fs');


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

app.use(express.static(__dirname + '/img'));


//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

const production  = 'https://mattlinebot.herokuapp.com/';
const development = 'http://localhost:8080/';
const url = (process.env.NODE_ENV ? production : development);

var userId ="";

var myTimeOut;
var countSum = 0;

var ModType = '';

var PWDAim = Math.floor(Math.random() * 99) + 1;
var intMax = 100;
var intMin = 0;
var leaveCount = 8;
var findDanCnt = 0;

function resetAll(){
  ModType = '';
  PWDAim = Math.floor(Math.random() * 99) + 1;
  intMax = 100;
  intMin = 0;
  leaveCount = 8;
}


var PWDGame = function(pwd){
  
  pwd = parseInt(pwd);

  if(leaveCount < 1){
    ModType = '';
    return "我難過";
  }

  if (pwd <= intMin || pwd >= intMax || isNaN(pwd))
  {

    return "請輸入介於" + intMin + "~" + intMax + "之間的數" ;      
  }

  if (pwd > PWDAim) {
      intMax = pwd;
      leaveCount-- ;
      return "終極密碼" + intMin+"~" + intMax+",還可猜" + leaveCount + "次";
  }

  if (pwd < PWDAim) {
      intMin = pwd;
      leaveCount-- ;
      return "終極密碼" + intMin+"~" + intMax+",還可猜" + leaveCount + "次";
  }

  if (pwd == PWDAim) {
      ModType = '';
      return "恭喜答對了";
  }
    
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
    },2000);
}

// bot.on('message', function(event) {
//     console.log(event); //把收到訊息的 event 印出來看看

//     userId = event.source.userId;
//     console.log("userID : " + userId);
// });
  
bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
    userId = event.source.userId;
    console.log("userID : " + userId);

    var GotIt = false;
    if (event.message.type = 'text') {
      var msg = event.message.text.toLowerCase() ;
      var replyMsg = '"' + msg + '?"' + functionPool.showIAmGroot(); 
      
      if(msg.indexOf('reset') != -1){
        GotIt = true;
        resetAll();
        bot.push(userId,"重新設定完成!!");
      }

      if(ModType == 'PWD'){
        if(msg.indexOf('exitpwd') != -1){
          GotIt = true;
          ModType = '';
          replyMsg = "已離開終極密碼-------";
          bot.push(userId,replyMsg);           
        }else{
          GotIt = true;
          bot.push(userId,PWDGame(msg));
        }

      }else{
        if (msg.indexOf('playpwd') != -1) {
          GotIt = true;
          ModType = 'PWD'              
          PWDAim = Math.floor(Math.random() * 99) + 1;
          intMax = 100;
          intMin = 0;
          leaveCount = 8 ;
          bot.push(userId,"終極密碼 " + intMin+" 到 " + intMax+" ,還可猜" + leaveCount + "次"); 
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
  
        if(msg.indexOf('stop') != -1){
          GotIt = true;
          bot.push(userId,"停止!!");
          clearTimeout(myTimeOut);
        }

        if (msg.indexOf('roll') != -1) {
          GotIt = true;
          var rollruselt = Math.floor(Math.random() * 99) + 1 + " !";
          bot.push(userId,rollruselt); 
        }

        if (msg.indexOf('dan') != -1) {
          console.log('findDanCnt:' + findDanCnt++);
          
          GotIt = true;
          var rollruselt = Math.floor(Math.random() * 25) + 1;
          var rtnImg =
          {
            type: 'image',
            originalContentUrl: url + '/' + rollruselt +'.jpg',
            previewImageUrl: url + '/' + rollruselt +'.jpg'
          };
          
          bot.push(userId,rtnImg); 
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






