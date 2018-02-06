const app = require('express')();
const middlewaresInitializer = require('./middlewares/middlewaresInitializer');
const passportInitializer = require('./passport/passportInitializer');

middlewaresInitializer.init(app);
passportInitializer.init(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on ${port}`));