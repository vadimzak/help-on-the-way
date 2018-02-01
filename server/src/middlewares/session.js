const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('../services/pgPool');

const middleware = session({
    store: new pgSession({
        pool,
        schemaName: 'help_private',
        tableName: 'user_sessions'
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days 
});

module.exports = middleware;