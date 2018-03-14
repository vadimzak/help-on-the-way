const start = phone_number => {
	return { data: { success: true, message: 'start' } };
};

const verify = async (phone_number, verification_code) => {
	return { data: { success: true, message: 'verify' } };
};

module.exports = {
	start,
	verify
};
