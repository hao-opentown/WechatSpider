var wechat = require('../../lib/WeChatService').getWeChat();


var async = require('async');
var _ = require('underscore');
var mongoose = require('mongoose');

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

            //execute it in sequence.
            async.eachSeries(contacts, function(contact, callback) {
                search(contact, function(isExisting) {
                    if (isExisting) {
                        console.log(contact.contact + ' is a friend of ' + currentUser);
                        if (contact.friend) {
                            if (contact.friend != currentUser) {
                                console.log(contact.contact + ' is the friend of both' + contact.friend + ' and ' + currentUser + '. skip...');
                            }
                            callback();
                        } else {
                            contact.friend = currentUser;
                            contact.save(function(err) {
                                console.log(err || 'save the friendship in db.');
                                callback();
                            });
                        }
                    } else {
                        console.log(contact.contact + ' is a stranger.');
                        callback();
                    }
                });
            }, function(err) {
                if (err) throw err;
                cleanup();
            });
        });
    });
});


function search(contact, callback) {
    console.log(contact);
    var text = 'undefined';
    if(contact.contact){
      text = contact.contact;
    }
    wechat.search(text).then(function(isExisting) {
        if (isExisting) {
            callback(true);
        } else {
            if(contact.nickname){
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
