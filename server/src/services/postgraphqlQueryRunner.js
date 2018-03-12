const { DB_SCHEMA, PGUSER } = process.env;
const { withPostGraphQLContext, postgraphql, createPostGraphQLSchema } = require('postgraphile');
const { graphql } = require('graphql');

const consts = require('../consts');
const pgPool = require('./pgPool');
const postgraphqlVariablesArrBuilder = require('./postgraphqlVariablesArrBuilder');

const DB_SCHEMAS = [DB_SCHEMA, 'help_private'];
const createSchema = createPostGraphQLSchema(consts.db.connectionString, DB_SCHEMAS, consts.postgraphql.schemaOptions);
const CONTEXT = { pgPool, pgDefaultRole: PGUSER, ...consts.postgraphql.contextOptions };

const query = async (name, query, variables) => {
	return await run('query', name, query, variables);
};

const mutation = async (name, query, variables) => {
	return await run('mutation', name, query, variables);
};

const run = async (type, name, query, variables) => {
	const variablesRawArr = postgraphqlVariablesArrBuilder.build(variables);
	const queryName = buildQueryName(variablesRawArr);
	const variablesStr = buildVariablesString(variablesRawArr);
	const graphQuery = `${type} ${queryName} {${name} ${variablesStr} {${query}}}`;
	const graphVariables = buildGraphVariables(variablesRawArr);

	const schema = await createSchema;

	const callback = async context => graphql(schema, graphQuery, null, context, graphVariables);

	const result = await withPostGraphQLContext(CONTEXT, callback);

	return new Promise((resolve, reject) => {
		if (result.errors) return reject(JSON.stringify(result.errors));

		resolve(result.data[name]);
	});
};

const buildQueryName = variablesRawArr => {
	if (!variablesRawArr) return '';

	const variablesDefinition = variablesRawArr.map(x => `$${x.name}: ${x.type}`).join(',');
	return `query_name(${variablesDefinition})`;
};

const buildVariablesString = variablesRawArr => {
	if (!variablesRawArr) return '';

	return '(' + variablesRawArr.map(x => `${x.name}: $${x.name}`).join(',') + ')';
};

const buildGraphVariables = variablesRawArr => {
	const variables = {};
	variablesRawArr.forEach(x => (variables[x.name] = x.value));
	return variables;
};

module.exports = {
	query,
	mutation
};
