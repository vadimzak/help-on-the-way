const passport = require('passport');
const redirectUrlMiddleware = require('./redirectUrlMiddleware');
const db = require('./passportDbQueryRunner');

const register = (app, loginUrl = '/login', provider) => {
	passport.use(new provider.StrategyConstructor(provider.strategyConfig, getOrCreateUserBySocial));

	app.get(
		`/login/${provider.name}`,
		redirectUrlMiddleware.saveRedirectUrlToSession,
		passport.authenticate(provider.name, provider.authenticationConfig)
	);

	app.get(
		`/login/${provider.name}/return`,
		passport.authenticate(provider.name, { failureRedirect: loginUrl }),
		redirectUrlMiddleware.popRedirectUrlFromSession,
		(req, res) => req.session.save(() => res.redirect(req.redirectUrl))
	);
};

const getOrCreateUserBySocial = async function(accessToken, refreshToken, profile, cb) {
	try {
		const user = await db.getOrCreateUserBySocial(profile, accessToken, refreshToken);

		return cb(null, user);
	} catch (err) {
		return cb(err);
	}
};

module.exports = {
	register
};
