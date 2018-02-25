const phoneVerifier = require('./phoneVerifier');

const init = app => {
    app.use('/phone', phoneVerifier);
};

module.exports = {
    init
};