var
    bodyParser  = require('body-parser'),
    express     = require('express'),

    Watson = require('../service/Watson')
;

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// Endpoint to create/continue a conversation.
router.post('/conversation', function (req, res) {
    var input, context;

    if (req.body) {
        input   = req.body.input;
        context = req.body.context;
    }

    // Invoke Watson Conversation api to start/continue a conversation
    // workflow.
    Watson.Say(input, context)
    .then(function (resp) {
        res.json(resp);
    })
    .catch(function (err) {
        res.status(500).json(err);
    });

});

// Export the router instance to simplify application
// level router allocations.
module.exports = router;
