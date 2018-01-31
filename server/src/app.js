const app = require('express')();
const middlewaresInitializer = require('./middlewares/middlewaresInitializer');
const passportInitializer = require('./passport/passportInitializer');
const endpointsInitializer = require('./endpoints/endpointsInitializer');

middlewaresInitializer.init(app);
passportInitializer.init(app);
endpointsInitializer.init(app);

app.get('/', (req, res) => {
    res.json(req.user);
})

app.listen(3000);