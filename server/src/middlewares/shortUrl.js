const router = require('express').Router();
const subdomain = require('express-subdomain');
const { SHORT_URL_SUBDOMAIN } = process.env;
const postgraphqlQueryRunner = require('../postgraphql/postgraphqlQueryRunner');

router.get('/:encodedUrl', async (req, res, next) => {
    let param = req.params.encodedUrl;

    const result = await postgraphqlQueryRunner.query('urlById', 'url', {
        id: {
            graphqlType: 'String!',
            value: param
        }
    });

    if (result && result.url) {
        return res.redirect(result.url);
    } 

    next();
});

module.exports = subdomain(SHORT_URL_SUBDOMAIN, router);