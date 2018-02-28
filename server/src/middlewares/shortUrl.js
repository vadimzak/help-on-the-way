const router = require('express').Router();
const subdomain = require('express-subdomain');
const { SHORT_URL_SUBDOMAIN } = process.env;

const { postgraphqlQueryRunner, groupToSessionRepository } = require('../services');

router.get('/:encodedUrl', async (req, res, next) => {
	let param = req.params.encodedUrl;

	const result = await postgraphqlQueryRunner.query('urlById', 'url, metadata', {
		id: {
			graphqlType: 'String!',
			value: param
		}
	});

	if (result && result.url) {
		groupToSessionRepository.set(req, result.metadata.group_id);

		return res.redirect(result.url);
	}

	next();
});

module.exports = subdomain(SHORT_URL_SUBDOMAIN, router);
