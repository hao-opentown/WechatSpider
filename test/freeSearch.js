var wechat = require('../lib/WeChatService').getWeChat();

function loop() {
    wechat
        .waitConsole().then(function(input) {
            if (input != 'exit') {
                this.search(input).then(function(result) {
                    console.log(result);
                    if (result == false) {
                        console.log('no matched.')
                    } else {
                        result.click();
                    }
                    loop();
                });
            }
        })
}
loop();
