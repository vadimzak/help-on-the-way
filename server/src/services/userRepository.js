const postgraphqlQueryRunner = require('./postgraphqlQueryRunner');

const get = async (userId, returnedAttributes) => {
	const result = await postgraphqlQueryRunner.query('personById', returnedAttributes, {
		id: {
			graphqlType: 'Int!',
			value: userId
		}
	});

	return result;
};

const update = async (userId, personPatch, returnedAttributes = 'id') => {
	await postgraphqlQueryRunner.mutation('updatePersonById', `person { ${returnedAttributes} }`, {
		input: {
			graphqlType: 'UpdatePersonByIdInput!',
			value: {
				id: userId,
				personPatch
			}
		}
	});
};

module.exports = {
	get,
	update
};
