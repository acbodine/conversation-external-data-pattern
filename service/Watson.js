var
    ConversationV1 = require('watson-developer-cloud/conversation/v1')
;

function Watson () {
    this.conversation = new ConversationV1(configFromEnv())
}

Watson.prototype.Say = function (something, context) {
    var self = this;

    var req = something != undefined ? something : {};

    if (context) req = {
        input:      {text: something},
        context:    context
    };

    return new Promise(function (resolve, reject) {
        self.conversation.message(req, function (err, resp) {
            if (err) return reject(err);

            resolve(resp)
        });
    });
};

function configFromEnv() {
    var c = {};

    c.username = process.env.WATSON_CONVERSATION_USERNAME;
    c.password = process.env.WATSON_CONVERSATION_PASSWORD;
    c.path = {
        workspace_id: process.env.WATSON_CONVERSATION_WORKSPACE
    };
    c.version_date = '2017-04-21';

    return c;
}

module.exports = new Watson();
