const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('../services/pgPool');
const consts = require('../consts');

const middleware = session({
    store: new pgSession({
        pool,
        schemaName: consts.db.privateSchemaName,
        tableName: consts.db.sessionTableName
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days 
});

module.exports = middleware;