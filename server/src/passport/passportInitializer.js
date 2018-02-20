const providers = require('./providers');
const userSerializationInitializer = require('./userSerializationInitializer');
const providerEndpointsRegisterer = require('./providerEndpointsRegisterer');

const init = (app, loginUrl) => {
    userSerializationInitializer.init();

    providers.forEach(provider => providerEndpointsRegisterer.register(app, loginUrl, provider));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect(req.headers.referer);
    });
};

module.exports = {
    init
};