const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, PG_DEFAULT_ROLE } = process.env;
const DEFAULT_ROLE = PG_DEFAULT_ROLE == 'postgres' ? 'ADMIN' : PG_DEFAULT_ROLE;

const me = (req, res) => {
	const { firstName, lastName } = req.user || { firstName: 'Anonymous', lastName: '' };
	const name = `${firstName} ${lastName}`.trim();

	const { person_id, type } = extractAuthorizationFromHeader(req) || { person_id: 0, type: DEFAULT_ROLE };

	res.json({ person_id, name, role: type });
};

const extractAuthorizationFromHeader = req => {
	const auth = req.session.authorization;
	if (!auth) return null;

	const jwt = auth.replace(/Bearer /, '');

	const { person_id, type } = jsonwebtoken.verify(jwt, JWT_SECRET);
	return { person_id, type };
};

module.exports = me;
