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

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});


bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
});
  
bot.on('message', function(event) {

    if (event.message.type = 'text') {
      var msg = event.message.text ;
      var replyMsg = '"' + msg + '?"' + functionPool.showIAmGroot(); 
      
      if (msg.indexOf('Time') != -1) {      
        replyMsg = functionPool.checkTime();              
      }

      if (msg.indexOf('search') != -1){
        replyMsg = functionPool.googleSearch();
      }

      event.reply(replyMsg).then(function(data) {
        // success 
        console.log(replyMsg);
      }).catch(function(error) {
        // error 
        console.log('error');
      });
    }
  });


//   setTimeout(function(){
//     var userId = '使用者 ID';
//     var sendMsg = '要發送的文字';
//     bot.push(userId,sendMsg);
//     console.log('send: '+sendMsg);
// },5000);


