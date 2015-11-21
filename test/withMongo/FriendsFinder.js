var wechat = require('../../lib/WeChatService').getWeChat();


var async = require('async');
var _ = require('underscore');
var mongoose = require('mongoose');

var currentUser = 'haozi';

var Contact = mongoose.model('Contact', {
    contact: String,
    image: String,
    sent: Boolean,
    friend: String
});

mongoose.connect('mongodb://localhost/wechat', function(err) {
    if (err) throw err;

    Contact.find(function(err, contacts) {
        if (err) throw err;
        //console.log(contacts);
        wechat.waitConsole('please input something to continue.').then(function() {

            //execute it in sequence.
            async.eachSeries(contacts, function(contact, callback) {
                console.log(contact.contact);
                wechat.search(contact.contact)
                    .then(function(isExisting) {
                        console.log(isExisting);
                        if (isExisting) {
                            contact.friend = currentUser;
                            contact.save(function(err) {
                                console.log(err || 'save successfully.');
                                callback();
                            });
                        } else {
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

function cleanup() {
    wechat.end();
    mongoose.disconnect();
}
