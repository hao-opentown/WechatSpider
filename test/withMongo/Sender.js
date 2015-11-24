var wechat = require('../../lib/WeChatService').getWeChat();


var async = require('async');
var _ = require('underscore');
var mongoose = require('mongoose');
var path = require('path');
var dataPath = path.join(__dirname, 'data');

var Contact = mongoose.model('Contact', {
    contact: String,
    nickname: String,
    image: String,
    sent: Boolean,
    friend: String
});

mongoose.connect('mongodb://localhost/wechat', function(err) {
    if (err) throw err;

    Contact.find(function(err, contacts) {
        if (err) throw err;
        //console.log(contacts);

        wechat.waitConsole('please input the current user name....').then(function(currentUser) {
            contacts = _.filter(contacts, function(contact) {
                return contact.friend == currentUser && !contact.sent;
            });
            console.log(contacts);
            //execute it in sequence.
            async.eachSeries(contacts, function(contact, callback) {

                search(contact, function(isExisting) {
                    if (!isExisting) {
                        console.log('oops! the following contact should be a friend of ' + currentUser);
                        console.log(contact);
                        callback();
                    } else {
                        sendCard(contact, function(success) {
                            if (success) {
                                contact.sent = true;
                                contact.save(function(err) {
                                    console.log(err || 'mark sent in db.');
                                    callback();
                                });
                            } else {
                                callback();
                            }
                        });
                    }
                });
            }, function(err) {
                if (err) throw err;
                cleanup();
            });
        });
    });
});


function sendCard(contact, callback) {
    var isGroup = '#chatArea .title_wrap .title_count';
    wechat.isExisting(isGroup).then(function(isExisting) {
        if (isExisting) {
            console.log('warning. 用户在群里，请先加好友. Its image is ' + contact.image);
            callback(false);
        } else {
            wechat
                .sendMessage('哈喽～父老乡亲们久等啦！感谢帮open打码～以下是你的专属邀请码，可以优先扫描下载。我们即将上线，欢迎持续关注我们哦～\n')
                .sendFile(path.join(dataPath, 'cards', contact.image))
                .pause(7000)
                .then(function() {
                    callback(true);
                });
        }
    })
}

function search(contact, callback) {
    console.log(contact);
    var text = 'undefined';
    if (contact.contact) {
        text = contact.contact;
    }
    wechat.search(text).then(function(isExisting) {
        if (isExisting) {
            callback(true);
        } else {
            if (contact.nickname) {
                text = contact.nickname;
            }
            wechat.search(text).then(function(isExisting) {
                callback(isExisting);
            });
        }
    });
}

function cleanup() {
    wechat.end();
    mongoose.disconnect();
}
