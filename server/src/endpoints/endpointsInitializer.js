const phoneVerifier = require('./phoneVerifier');
const me = require('./me');

const init = app => {
	app.use('/phone', phoneVerifier);
	app.get('/me', me);
};

module.exports = {
	init
};
