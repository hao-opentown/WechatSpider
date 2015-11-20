var helper = require('./WeChatMethods');

var WeChatService = {
    getWeChat: function() {
        var webdriverio = require('webdriverio');
        var options = {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        };
        var client = webdriverio.remote(options);

        client.addCommand('sendMessage',helper.sendMessage.bind(client));
        client.addCommand('sendFile',helper.sendFile.bind(client));
        client.addCommand('waitConsole',helper.waitConsole.bind(client));
        client.addCommand('selectRandomMember',helper.selectRandomMember.bind(client));
        client.addCommand('search',helper.search.bind(client));

        return client.init().url('https://wx.qq.com');
    }
}

module.exports = WeChatService;
