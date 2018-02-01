const { withPostGraphQLContext, postgraphql, createPostGraphQLSchema } = require('postgraphql');
const { graphql } = require('graphql');

const pgPool = require('../services/pgPool');
const variableStringBuilder = require('./variableStringBuilder');

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, DB_SCHEMA, JWT_SECRET } = process.env;
const CONNECTION_STRING = `postgres://${PGHOST}:${PGPORT}/${PGDATABASE}`;
const OPTIONS = {
    dynamicJson: true, //'Setting this to true enables dynamic JSON which will allow you to use any JSON as input and get any arbitrary JSON as output. By default JSON types are just a JSON string.',
    jwtSecret: JWT_SECRET, // 'The secret for your JSON web tokens. This will be used to verify tokens in the Authorization header, and signing JWT tokens you return in procedures.',
    // jwtPgTypeIdentifier: "TODO", //'The Postgres type identifier for the compound type which will be signed as a JWT token if ever found as the return type of a procedure. Can be of the form: my_schema.my_type. You may use quotes as needed: "my-special-schema".my_type.',
};

const createSchema = createPostGraphQLSchema(CONNECTION_STRING, DB_SCHEMA, OPTIONS)
const context = { pgPool, pgDefaultRole: PGUSER };

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

// const myPgPool = new Pool();

//     createPostGraphQLSchema(CONNECTION_STRING).then(schema => {
//         withPostGraphQLContext(
//             {
//                 pgPool: myPgPool,
//                 jwtToken: '...',
//                 jwtSecret: JWT_SECRET, // 'The secret for your JSON web tokens. This will be used to verify tokens in the Authorization header, and signing JWT tokens you return in procedures.',
//                 pgDefaultRole: PGUSER, // The default Postgres role to use. If no role was provided in a provided JWT token, this role will be used.',
//             },
//             async context => {
//                 // You execute your GraphQL query in this function with the provided `context` object.
//                 // The `context` object will not work for a GraphQL execution outside of this function.
//                 return await graphql(
//                     schema, // This is the schema we created with `createPostGraphQLSchema`.
//                     query,
//                     null,
//                     { ...context }, // Here we use the `context` object that gets passed to this callback.
//                     variables,
//                     operationName
//                 )
//             }
//         )
//     });
