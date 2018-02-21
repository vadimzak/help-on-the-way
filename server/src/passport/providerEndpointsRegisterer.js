const passport = require('passport');
const referrerMiddlewares = require('./referrerMiddlewares');
const db = require('./passportDbQueryRunner');

const register = (app, loginUrl = '/login', provider) => {
	passport.use(new provider.StrategyConstructor(provider.strategyConfig, getOrCreateUserBySocial));

	app.get(
		`/login/${provider.name}`,
		referrerMiddlewares.saveReferrerToSession,
		passport.authenticate(provider.name, provider.authenticationConfig)
	);

	app.get(
		`/login/${provider.name}/return`,
		passport.authenticate(provider.name, { failureRedirect: loginUrl }),
		referrerMiddlewares.popReferrerFromSession,
		(req, res) => req.session.save(() => res.redirect(req.referer))
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
