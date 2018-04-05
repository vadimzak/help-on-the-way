const cors = require('cors');
const whiteList = process.env.CORS_FOR_DEV_VOLUNTEER_APP_URL ? process.env.CORS_FOR_DEV_VOLUNTEER_APP_URL.split(',') : [];
const corsOptions = {
	origin(origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, true)
		  } else {
			callback(new Error('Not allowed by CORS'))
		  }
	},
	credentials: true
};

module.exports = () => cors(corsOptions);
