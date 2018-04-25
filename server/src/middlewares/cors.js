const cors = require('cors');
const whiteList = process.env.CORS_FOR_DEV_VOLUNTEER_APP_URL ? process.env.CORS_FOR_DEV_VOLUNTEER_APP_URL.split(',') : [];
const corsOptions = {
	origin: whiteList,
	credentials: true
};

module.exports = () => cors(corsOptions);
