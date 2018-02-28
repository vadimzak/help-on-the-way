const { groupToSessionRepository, volunteerToGroupAdder } = require('../services');

const volunteerToGroupAdderMiddleware = async (req, res, next) => {
	let groupId = groupToSessionRepository.pop(req);

	if (groupId) await volunteerToGroupAdder.add(req.user.id, groupId);

	next();
};

module.exports = volunteerToGroupAdderMiddleware;
