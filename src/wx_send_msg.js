var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
var client = webdriverio.remote(options);

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var wechat = client
    .init()
    .url('https://wx.qq.com');

rl.question('please input Y to confirm you have logged in.', function(answer) {
    console.log("Okay", answer);

    var sampleFile = '/Users/wangzhihao/opentown/repos/tmp/wechatSpider/WechatSpider/人人死而平等.png';

    wechat.element('.chat_list .chat_item:nth-Child(1)').click()
        .setValue('#editArea', '这是一条自动消息哦～').click('.btn_send')
        .chooseFile('.webuploader-element-invisible', sampleFile)
        .getTitle().then(function(title) {
            console.log('Title is: ' + title);
        });
    // .end();
    rl.close();
});
