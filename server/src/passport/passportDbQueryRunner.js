const { postgraphqlQueryRunner } = require('../services');
const PERSON_GRAPHQL_QUERY = 'person {id}';

const getOrCreateUserBySocial = async (profile, accessToken, refreshToken) => {
	const { person } = await postgraphqlQueryRunner.mutation('getOrCreateUserBySocial', PERSON_GRAPHQL_QUERY, {
		input: {
			graphqlType: 'GetOrCreateUserBySocialInput!',
			value: {
				profileInput: profile,
				tokensInput: { accessToken, refreshToken }
			}
		}
	});

	return person;
};

const getUserById = async userId =>
	await postgraphqlQueryRunner.query('personById', 'id, firstName, lastName, type', { id: userId });

module.exports = {
	getOrCreateUserBySocial,
	getUserById
};
