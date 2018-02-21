const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_URL } = process.env;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = [
	{
		name: 'facebook',
		StrategyConstructor: FacebookStrategy,
		strategyConfig: {
			clientID: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET,
			callbackURL: `${SERVER_URL}/login/facebook/return`
		}
	},
	{
		name: 'google',
		StrategyConstructor: GoogleStrategy,
		strategyConfig: {
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: `${SERVER_URL}/login/google/return`
		},
		authenticationConfig: { scope: ['profile'] }
	}
];
