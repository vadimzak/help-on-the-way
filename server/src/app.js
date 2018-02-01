const app = require('express')();
const middlewaresInitializer = require('./middlewares/middlewaresInitializer');
const passportInitializer = require('./passport/passportInitializer');

middlewaresInitializer.init(app);
passportInitializer.init(app);

app.listen(3000);