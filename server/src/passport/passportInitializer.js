const postgraphqlQueryRunner = require('../postgraphql/postgraphqlQueryRunner');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + '/login/facebook/return'
},
    function (accessToken, refreshToken, profile, cb) {
        // check if there's already a user with the corresponding facebook profile
        // if so, update 
        // if not, create user
        // return the user object (and not the profile)

        return cb(null, profile);
    }));

passport.serializeUser(async function (user, cb) {
    // supplying the user ID when serializing
    cb(null, user.id);
});

passport.deserializeUser(async function (userId, cb) {
    // querying the user record by ID from the database when deserializing
    const { personById } = await postgraphqlQueryRunner.query("personById(id: $id) { firstName, lastName }", { id: 1 });
    cb(null, personById);
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