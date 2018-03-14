const cors = require('./cors');

const init = app => {
	app.use(cors());
};

module.exports = {
	init
};
