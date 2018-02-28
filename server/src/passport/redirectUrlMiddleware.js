const { DOMAIN } = process.env;
const VALIDATE_REDIRECT_URL_REGEX = new RegExp(`https?://[^/]*${DOMAIN.replace(/\./g, '\\.')}:?\\d{0,5}/`, 'i');

const saveRedirectUrlToSession = (req, res, next) => {
	let redirectUrl = req.query.redirectUrl;
	if (!redirectUrl || !validate(redirectUrl)) throw 'redirectUrl parameter is mandatory';

	req.session.redirectUrl = redirectUrl;
	next();
};

const popRedirectUrlFromSession = (req, res, next) => {
	req.redirectUrl = req.session.redirectUrl;
	delete req.session.redirectUrl;
	next();
};

const validate = redirectUrl => {
	return VALIDATE_REDIRECT_URL_REGEX.test(redirectUrl);
};

module.exports = {
	saveRedirectUrlToSession,
	popRedirectUrlFromSession
};
