const login = require('./login');

// require('connect-ensure-login').ensureLoggedIn(),

const init = app => {
    app.post('/login', login);
};

module.exports = {
    init
};