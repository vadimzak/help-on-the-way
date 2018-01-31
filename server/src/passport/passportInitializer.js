var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return'
},
    function (accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    // supplying the user ID when serializing
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    // querying the user record by ID from the database when deserializing
    cb(null, obj);
});

const init = (app, baseUrl = '/', loginUrl = '/login') => {
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login/facebook', passport.authenticate('facebook'));

    app.get('/login/facebook/return',
        passport.authenticate('facebook', { failureRedirect: loginUrl }),
        function (req, res) {
            res.redirect(baseUrl);
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect(baseUrl);
    });
};

module.exports = {
    init
};