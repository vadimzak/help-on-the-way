const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, JWT_AUDIENCES } = process.env;
const jwtSignOptions = { noTimestamp: true };

const set = (req, force = false) => {
	req.headers.authorization = req.session.authorization =
		(!force && req.session.authorization) || generateAuthorizationHeader(req.user);
};

const generateAuthorizationHeader = user => {
	if (!user) return undefined;

	const { id: person_id, type } = user;
	const payload = { person_id, type, aud: JWT_AUDIENCES };
	const jwt = jsonwebtoken.sign(payload, JWT_SECRET, jwtSignOptions);
	return `Bearer ${jwt}`;
};

module.exports = {set};
