const isInDevelopmentMode = process.env.NODE_ENV == 'dev';

const app = require('express')();
const middlewaresInitializer = require('./middlewares/middlewaresInitializer');
const passportInitializer = require('./passport/passportInitializer');
const endpointsInitializer = require('./endpoints/endpointsInitializer');
const devModeAppInitializer = require('../src/dev/devModeAppInitializer');

if (isInDevelopmentMode) {
	devModeAppInitializer.init(app);
}

middlewaresInitializer.init(app);
passportInitializer.init(app, '/graphiql');
endpointsInitializer.init(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on ${port}`));
