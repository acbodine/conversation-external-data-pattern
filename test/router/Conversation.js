var
    assert      = require('assert'),
    express     = require('express'),
    supertest   = require('supertest'),

    ConversationRouter = require('../../router/Conversation')
;

describe('router', function () {
    describe('Conversation', function () {
        var app = undefined;
        var harness = undefined;

        before(function () {
            app = express();
            app.use(ConversationRouter)

            harness = supertest(app);
        })

        describe('POST /conversation', function () {
            it('should return a new conversation.', function (next) {
                harness.post('/conversation')
                .expect(200, function (err, res) {
                    assert.equal(err, undefined);
                    assert.notEqual(res.body, undefined);

                    next();
                });
            });

            it('should return a continued conversation.', function (next) {
                harness.post('/conversation')
                .expect(200)
                .end(function (err, res) {

                    harness.post('/conversation')
                    .send({
                        input:      'foobar',
                        context:    res.body.context
                    })
                    .expect(200, function (err, res2) {

                        assert.equal(err, undefined);
                        assert.notEqual(res2.body, undefined);
                        assert.equal(
                            res.body.context.conversation_id,
                            res2.body.context.conversation_id
                        );

                        next();
                    });
                });
            });
        });

    });
});
