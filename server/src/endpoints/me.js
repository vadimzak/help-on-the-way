const { PG_DEFAULT_ROLE } = process.env;
const DEFAULT_ROLE = PG_DEFAULT_ROLE == 'postgres' ? 'ADMIN' : PG_DEFAULT_ROLE;

const me = (req, res) => {
	const { firstName, lastName, type } = req.user || { firstName: 'Anonymous', lastName: '', type: DEFAULT_ROLE };
	const name = `${firstName} ${lastName}`.trim();

	res.json({ name, role: type });
};

module.exports = me;
