var WeChatService = require('./lib/WeChatService');

var wechat = WeChatService.getWeChat();

function loop(){
  wechat
    .waitConsole().then(function(input){
      if(input != 'exit'){
        this.search(input);
        loop();
      }
    })
}
loop();
