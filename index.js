var linebot = require('linebot');
var express = require('express');
var functionPool = require('./myLib/fucntionPool');


var bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
});

const app = express();
const linebotParser = bot.parser();
// app.get("/", function (req, res) { 
//   res.send("Hello LineBot");
// });
app.post('/', linebotParser);


bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
});
  

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
var port = server.address().port;
console.log("App now running on port", port);
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


