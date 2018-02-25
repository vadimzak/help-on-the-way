const { authCookieToHeaderSetter } = require('../services');

const authCookieToHeader = (req, res, next) => {
	authCookieToHeaderSetter.set(req);

	return next();
};

module.exports = authCookieToHeader;
