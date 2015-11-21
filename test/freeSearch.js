var wechat = require('../lib/WeChatService').getWeChat();

function loop() {
    wechat
        .waitConsole().then(function(input) {
            if (input != 'exit') {
                this.search(input)
                    .then(function(isExisting) {
                        //console.log(this);
                        if(isExisting){
                          console.log('找到该用户，可以自动发信了。');
                        }else{
                          console.log('用户不存在，请尝试加ta。');
                        }
                        loop();
                    });
            }else{
              this.end();
            }
        })
}


loop();
