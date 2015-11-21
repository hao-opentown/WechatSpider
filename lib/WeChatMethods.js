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
        
        var firstCandidate = '.recommendation .contact_item:nth-Child(1)';
        var results = '.recommendation';
        var searchInput = '.search_bar input';

        return this
            .setValue(searchInput, text)
            .keys(['Enter'])
            .waitForVisible(results, 5000)
            .isExisting(firstCandidate).then(function(isExisting) {
                if (isExisting) {
                    return this
                        .click(firstCandidate)
                        .then(function() {
                            //console.log('clicked');
                            return true;
                        });
                } else {
                    //reset the search state.
                    return this
                        .clearElement(searchInput)
                        .click(searchInput)
                        //reverse flag means wait for disappear
                        .waitForVisible(results, 5000, true)
                        .then(function() {
                            return false;
                        });
                }
            });
    },

    waitConsole: function(question) {
        var Q = require('q');
        var defer = Q.defer();
        var readline = require('readline');
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question + '\n', function(answer) {
            console.log("Okay");
            rl.close();
            defer.resolve(answer);
        });
        return defer.promise;
    }
};

module.exports = WeChatMethods;
