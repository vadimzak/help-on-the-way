const { withPostGraphQLContext, postgraphql, createPostGraphQLSchema } = require('postgraphql');
const Pool = require('pg-pool');
const { graphql } = require('graphql');
const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, DB_SCHEMA, JWT_SECRET } = process.env;
const CONNECTION_STRING = `postgres://${PGHOST}:${PGPORT}/${PGDATABASE}`;

const pgPool = new Pool();
const OPTIONS = {
    jwtSecret: JWT_SECRET, // 'The secret for your JSON web tokens. This will be used to verify tokens in the Authorization header, and signing JWT tokens you return in procedures.',
    // jwtPgTypeIdentifier: "TODO", //'The Postgres type identifier for the compound type which will be signed as a JWT token if ever found as the return type of a procedure. Can be of the form: my_schema.my_type. You may use quotes as needed: "my-special-schema".my_type.',
};

const createSchema = createPostGraphQLSchema(CONNECTION_STRING, DB_SCHEMA, OPTIONS)

const run = async query => {
    const schema = await createSchema;
    
    const context = { pgPool, pgDefaultRole: PGUSER };
    const callback = async context => graphql(schema, query, null, context)

    return await withPostGraphQLContext(context, callback);
}

module.exports = {
    run
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
