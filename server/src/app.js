const express = require('express');
const app = express();

const middlewares = {
    cookieParser: require('cookie-parser'),
    bodyParser: require('body-parser'),
    authCookieToHeader: require('./middlewares/authCookieToHeader'),
    postgraphql: require('./middlewares/postgraphql')
};

const endpoints = {
    login: require('./endpoints/login')
};

app.use(middlewares.cookieParser());
app.use(middlewares.bodyParser.json())
app.use(middlewares.authCookieToHeader);
app.use(middlewares.postgraphql);

app.post('/login', endpoints.login);

app.listen(3000);