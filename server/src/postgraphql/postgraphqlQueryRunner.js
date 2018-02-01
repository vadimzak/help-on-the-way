const { withPostGraphQLContext, postgraphql, createPostGraphQLSchema } = require('postgraphql');
const { graphql } = require('graphql');

const consts = require('../consts');
const pgPool = require('../services/pgPool');
const variableStringBuilder = require('./variableStringBuilder');

const createSchema = createPostGraphQLSchema(consts.db.connectionString, process.env.DB_SCHEMA, consts.postgraphql.schemaOptions);
const context = { pgPool, ...consts.postgraphql.contextOptions };

const query = async (query, variables) => {
    const variablesStr = variableStringBuilder.build(variables);
    const queryStr = `query query_name(${variablesStr}) {${query}}`;

    return await run(queryStr, variables);
}

const mutation = async (mutationName, query, variablesArr) => {
    const variablesDefinitionStr = variablesArr.map(x => `$${x.name}: ${x.type}`).join(',');
    const variablesStr = variablesArr.length > 0 ? '(' + variablesArr.map(x => `${x.name}: $${x.name}`).join(',') + ')' : '';
    const queryName = variablesArr ? `query_name(${variablesDefinitionStr})` : ``;
    const queryStr = `mutation ${queryName} {${mutationName} ${variablesStr} {${query}}}`;
    const variables = {};
    variablesArr.forEach(x => variables[x.name] = x.value);

    return await run(queryStr, variables);
}

const run = async (queryStr, variables) => {
    const schema = await createSchema;

    const callback = async context => graphql(schema, queryStr, null, context, variables)

    const result = await withPostGraphQLContext(context, callback);
    return result.data || result;
}

module.exports = {
    query,
    mutation
};