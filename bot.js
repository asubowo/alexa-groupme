var HTTPS = require('https');
var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /Alexa[,\s]+play Despacito/;
  console.log(request);
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  let botResponse = "ɴᴏᴡ ᴘʟᴀʏɪɴɢ: Despacito\n" +
      "───────────────⚪────────────────────────────\n" +
      "◄◄⠀▐▐ ⠀►►⠀⠀ ⠀ 1:17 / 3:48 ⠀ ───○ 🔊⠀ ᴴᴰ ⚙ ❐ ⊏⊐";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id": botID,
    "text": botResponse
  };

  botReq = HTTPS.request(options, function(res) {
    if (res.statusCode == 202 ) {
      // good to go
    } else {
      console.log("Error posting message. Got status code " + res.statusCode);
    }
  });

  botReq.on('error', function(err) {
    console.log("Error posting message " + JSON.stringify(err));
  });

  botReq.end(JSON.stringify(body));
}

exports.respond = respond;