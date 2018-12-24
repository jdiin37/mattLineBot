var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: 1633532932,
  channelSecret: "6910a629fc623d9cf4a694210efcd5d3",
  channelAccessToken: "AHiY5f0xMKs40q/4AtjriVJ06BX36+A3aWfgE0UgKtzShO4UL3/2sPzMj0+fP7ayTjQrg02wnwjT7EeJnQlIj/wS3s+f8RHat7zZE1qaNAfVp8TOAueT6O6gwiCNYQbJtJQMbXneU2q846EOn78PbwdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
});
  
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
var port = server.address().port;
console.log("App now running on port", port);
});