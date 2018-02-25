const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { pgPool } = require('../services');
const consts = require('../consts');

const middleware = session({
	store: new pgSession({
		pool: pgPool,
		schemaName: consts.db.privateSchemaName,
		tableName: consts.db.sessionTableName
	}),
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		domain: process.env.COOKIE_DOMAIN,
		maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
	}
});

module.exports = middleware;
