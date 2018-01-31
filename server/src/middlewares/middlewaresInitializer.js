const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const authCookieToHeaderMiddleware = require('./authCookieToHeader');
const postgraphqlMiddlesware = require('./postgraphql');

const init = app => {
    app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(authCookieToHeaderMiddleware);
    app.use(postgraphqlMiddlesware);
};

module.exports = {
    init
};