const set = (req, groupId) => {
	req.session.groupIdToAddVolunteerTo = groupId;
};

const pop = req => {
	let groupId = req.session.groupIdToAddVolunteerTo;
	delete req.session.groupIdToAddVolunteerTo;
	return groupId;
};

module.exports = {
	set,
	pop
};
