const { twiloVerifier, userRepository, roles, authCookieToHeaderSetter } = require('../services');

const HTTP_STATUS = { OK: 200, BAD_REQUEST: 400, FORBIDDEN: 403 };
const router = require('express').Router();

const init = () => {
	router.use(validateAuthentication);
	router.post('/update', updatePhone);
	router.post('/verify', verify);
};

const validateAuthentication = async (req, res, next) => {
	if (req.isAuthenticated() && req.user.type == roles.VOLUNTEER_UNVERIFIED) {
		return next();
	}

	res.status(HTTP_STATUS.FORBIDDEN).json('Forbidden');
};

const updatePhone = async (req, res, next) => {
	const { phoneNumber } = req.body;
	if (!phoneNumber) return res.status(HTTP_STATUS.BAD_REQUEST).json('phone parameter is mandatory');

	await userRepository.update(req.user.id, { phoneNumber });

	const twiloResult = await twiloVerifier.start(phoneNumber);

	return sendResult(res, twiloResult);
};

const verify = async (req, res, next) => {
	const { verificationCode } = req.body;
	const user = await userRepository.get(req.user.id, 'phoneNumber');

	const twiloResult = await twiloVerifier.verify(user.phoneNumber, verificationCode);

	await handleVerifyTwiloResult(twiloResult, req);

	return sendResult(res, twiloResult);
};

const sendResult = (res, twiloResult) => {
	const status = twiloResult.data.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST;

	return res.status(status).json(twiloResult.data.message);
};

const handleVerifyTwiloResult = async (twiloResult, req) => {
	if (!twiloResult.data.success) return;

	await userRepository.update(req.user.id, { type: roles.VOLUNTEER });
	authCookieToHeaderSetter.set(req);
};

init();

module.exports = router;
