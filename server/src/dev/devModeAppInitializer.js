const twiloVerifier = require('../services/twiloVerifier');
const devTwiloVerifier = require('./services/devTwiloVerifier');

const init = app => {
	const devMiddlewaresInitializer = require('./middlewares/devMiddlewaresInitializer');

	devMiddlewaresInitializer.init(app);
	Object.keys(devTwiloVerifier).forEach(key => (twiloVerifier[key] = devTwiloVerifier[key]));
};

module.exports = {
	init
};
