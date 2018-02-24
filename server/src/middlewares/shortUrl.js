const router = require('express').Router();
const subdomain = require('express-subdomain');
const { SHORT_URL_SUBDOMAIN } = process.env;

const postgraphqlQueryRunner = require('../postgraphql/postgraphqlQueryRunner');
const volunteerToGroupAdder = require('../services/volunteerToGroupAdder');

router.get('/:encodedUrl', async (req, res, next) => {
    let param = req.params.encodedUrl;

    const result = await postgraphqlQueryRunner.query('urlById', 'url, metadata', {
        id: {
            graphqlType: 'String!',
            value: param
        }
    });

    if (result && result.url) {
        await volunteerToGroupAdder.add(req.user.id, result.metadata.group_id);

        return res.redirect(result.url);
    }

    next();
});

module.exports = subdomain(SHORT_URL_SUBDOMAIN, router);