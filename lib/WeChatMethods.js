/**
 * extends webdriverIO with WeChat commands.
 */
var WeChatMethods = {
    selectRandomMember: function() {
        return this.click('.chat_list .chat_item:nth-Child(1)');
    },
    sendMessage: function(text) {
        return this.setValue('#editArea', text).click('.btn_send');
    },
    sendFile: function(filePath) {
        return this.chooseFile('.webuploader-element-invisible', filePath);
    },

    search: function(text) {
        return this
            .setValue('.search_bar input', text)
            .keys(['Enter'])
            .waitForVisible('.recommendation')
            .pause(1000)
            .click('.recommendation .contact_item:nth-Child(1)');
    },

    waitConsole: function() {
        var Q = require('q');
        var defer = Q.defer();
        var readline = require('readline');
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('please input something to continue.\n', function(answer) {
            console.log("Okay");
            rl.close();
            defer.resolve(answer);
        });
        return defer.promise;
    }
};

module.exports = WeChatMethods;
