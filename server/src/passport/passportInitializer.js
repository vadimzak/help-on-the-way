const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const db = require('./passportDbQueryRunner');
const referrerMiddlewares = require('./referrerMiddlewares')

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + '/login/facebook/return'
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const user = await db.findUserByFacebookId(profile.id) ||
                await db.createUserFromFacebookProfile(profile);

            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }));

passport.serializeUser(async function (user, cb) {
    // supplying the user ID when serializing
    cb(null, user.id);
});

passport.deserializeUser(async function (userId, cb) {
    // querying the user record by ID from the database when deserializing
    const user = await db.getUserById(userId);
    cb(null, user);
});

const init = (app, loginUrl = '/login') => {
    app.get('/login/facebook',
        referrerMiddlewares.saveReferrerToSession,
        passport.authenticate('facebook')
    );

    app.get('/login/facebook/return',
        passport.authenticate('facebook', { failureRedirect: loginUrl }),
        referrerMiddlewares.popReferrerFromSession,
        function (req, res) {
            req.session.save(() => res.redirect(req.referer));
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect(req.headers.referer);
    });
};

module.exports = {
    init
};