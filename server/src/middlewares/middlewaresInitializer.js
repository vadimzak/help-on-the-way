const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./session');
const authCookieToHeaderMiddleware = require('./authCookieToHeader');
const postgraphqlMiddlesware = require('./postgraphql');

const init = app => {
    app.use(sessionMiddleware);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(authCookieToHeaderMiddleware);
    app.use(postgraphqlMiddlesware);
};

module.exports = {
    init
};