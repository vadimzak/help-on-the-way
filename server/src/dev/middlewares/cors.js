const cors = require('cors');

const corsOptions = {
	origin: process.env.CORS_FOR_DEV_VOLUNTEER_APP_URL,
	credentials: true
};

module.exports = () => cors(corsOptions);
