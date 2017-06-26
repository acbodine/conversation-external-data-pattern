var routers = [
    Conversation    = require('./conversation')
];

function registerRouters (app) {
    routers.forEach(function (r) {
        app.use(r);
    });
}

module.exports = registerRouters;
