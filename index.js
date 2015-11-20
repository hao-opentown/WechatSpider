var WeChatService = require('./lib/WeChatService');

var sampleFile = '/Users/wangzhihao/opentown/repos/tmp/wechatSpider/WechatSpider/人人死而平等.png';

var wechat = WeChatService.getWeChat();

wechat
    .waitConsole()
    .selectRandomMember()
    .then(function(){
      console.log(this);
    })
    .sendMessage('hi, how is today?')
    .sendFile(sampleFile);
