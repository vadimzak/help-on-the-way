const passport = require('passport');
const db = require('./passportDbQueryRunner');

const init = () => {
	passport.serializeUser((user, callback) => callback(null, user.id));

	passport.deserializeUser(async (userId, callback) => {
		const user = await db.getUserById(userId);
		callback(null, user);
	});
};

module.exports = {
	init
};
