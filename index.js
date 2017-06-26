var
    cfenv   = require('cfenv'),
    express = require('express'),

    registerRouters = require('./router')
;

var port = 80;

// If we aren't running in 'development' mode, then we expect to be running
// inside a CloudFoundry env, so get the assigned port from the platform.
if (process.env.NODE_ENV !== 'development') port = cfenv.getAppEnv().port;

var app = express();

app.get('/', function (req, res) {
    res.send("Hello from conversation-external-data-pattern application.");
});

// Hookup routers to the Express application.
registerRouters(app);

app.listen(port, function () {
    console.log('Ready to handle conversations @ localhost:', port);
});
