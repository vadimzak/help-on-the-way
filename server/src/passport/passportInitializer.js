const postgraphqlQueryRunner = require('../postgraphql/postgraphqlQueryRunner');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + '/login/facebook/return'
},
    async function (accessToken, refreshToken, profile, cb) {
        const personResultQuery = `person {id}`;
        let data = await postgraphqlQueryRunner.mutation(
            `findUserBySocial`,
            `${personResultQuery}`,
            [{
                name: 'input',
                type: 'FindUserBySocialInput!',
                value: {
                    "type": "FACEBOOK",
                    "pId": profile.id
                }
            }]
        );
        if (data.errors) return cb(data.errors[0]);
        let person = data.findUserBySocial.person;

        if (!data.findUserBySocial.person) {
            var [firstName, lastName] = profile.displayName.split(' ');
            data = await postgraphqlQueryRunner.mutation(
                `registerPerson`,
                `${personResultQuery}`,
                [{
                    name: 'input',
                    type: 'RegisterPersonInput!',
                    value: {
                        firstName,
                        lastName,
                        "type": "FACEBOOK",
                        "data": { profile: profile._json }
                    }
                }]
            );
            if (data.errors) return cb(data.errors[0]);
            person = data.registerPerson.person;
        }

        return cb(null, person);
    }));

passport.serializeUser(async function (user, cb) {
    // supplying the user ID when serializing
    cb(null, user.id);
});

passport.deserializeUser(async function (userId, cb) {
    // querying the user record by ID from the database when deserializing
    const { personById } = await postgraphqlQueryRunner.query("personById(id: $id) { id, type }", { id: userId });
    cb(null, personById);
});

const init = (app, baseUrl = '/', loginUrl = '/login') => {
    app.get('/login/facebook', passport.authenticate('facebook'));

    app.get('/login/facebook/return',
        passport.authenticate('facebook', { failureRedirect: loginUrl }),
        function (req, res) {
            req.session.save(() => res.redirect(baseUrl));
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect(baseUrl);
    });
};

module.exports = {
    init
};