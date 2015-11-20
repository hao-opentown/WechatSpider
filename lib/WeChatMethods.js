/**
 * extends webdriverIO with WeChat commands.
 */
var WeChatMethods = {
    selectRandomMember: function() {
        return this.element('.chat_list .chat_item:nth-Child(1)').click();
    },
    sendMessage: function(text) {
        return this.setValue('#editArea', text).click('.btn_send');
    },
    sendFile: function(filePath) {
        return this.chooseFile('.webuploader-element-invisible', filePath);
    },

    search: function(text) {
        //TODO
    },

    waitConsole: function() {
        var Q = require('q');
        var defer = Q.defer();
        var readline = require('readline');
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('please input something to continue.', function() {
            console.log("Okay");
            rl.close();
            defer.resolve();
        });
        return defer.promise;
    }
};

module.exports = WeChatMethods;
