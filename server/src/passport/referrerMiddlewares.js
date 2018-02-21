const saveReferrerToSession = (req, res, next) => {
	req.session.referer = req.headers.referer;
	next();
};

const popReferrerFromSession = (req, res, next) => {
	req.referer = req.session.referer;
	delete req.session.referer;
	next();
};

module.exports = {
	saveReferrerToSession,
	popReferrerFromSession
};
