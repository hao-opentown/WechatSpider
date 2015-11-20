var WeChatService = require('./lib/WeChatService');

var sampleFile = '/Users/wangzhihao/opentown/repos/tmp/wechatSpider/WechatSpider/人人死而平等.png';

var wechat = WeChatService.getWeChat();

function loop(){
  wechat
    .waitConsole().then(function(input){
      if(input != 'exit'){
        var result = this.search(input);
        if(result == false){
          console.log('no matched.')
        }else{
          result.click();
        }
        loop();
      }
    })
}
loop();
// wechat
//     .waitConsole()
    //.search()
    // .selectRandomMember()
    // .sendMessage('hi, how is today?')
    // .sendFile(sampleFile);
