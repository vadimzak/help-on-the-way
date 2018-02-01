const postgraphql = require('postgraphql');
const consts = require('../consts');

const options = {
    ...consts.postgraphql.schemaOptions,
    ...consts.postgraphql.contextOptions,
    graphiql: true, // 'Set this to true to enable the GraphiQL interface.',
    // graphqlRoute: 'The endpoint the GraphQL executer will listen on. Defaults to /graphql.',
    // graphiqlRoute: 'The endpoint the GraphiQL query interface will listen on (NOTE: GraphiQL will not be enabled unless the graphiql option is set to true). Defaults to /graphiql.',
    // jwtRole: 'An array of strings describing the dotted path in the JWT from which to extract the postgres role. If none is provided it will use the key role on the root of the jwt. Defaults to ["role"].',
    watchPg: true, //'When true, PostGraphQL will watch your database schemas and re-create the GraphQL API whenever your schema changes, notifying you as it does. This feature requires an event trigger to be added to the database by a superuser. When enabled PostGraphQL will try to add this trigger, if you did not connect as a superuser you will get a warning and the trigger won’t be added.',
    // showErrorStack: 'Enables adding a stack field to the error response. Can be either the boolean true (which results in a single stack string) or the string json (which causes the stack to become an array with elements for each line of the stack).',
    // extendedErrors: 'Extends the error response with additional details from the Postgres error. Example: ["hint", "detail", "errcode"]. Default is [].',
    // disableQueryLog: 'Turns off GraphQL query logging. By default PostGraphQL will log every GraphQL query it processes along with some other information. Set this to true to disable that feature.',
    // enableCors: 'Enables some generous CORS settings for the GraphQL endpoint. There are some costs associated when enabling this, if at all possible try to put your API behind a reverse proxy.',
    // exportJsonSchemaPath: 'Enables saving the detected schema, in JSON format, to the given location. The directories must exist already, if the file exists it will be overwritten.',
    // exportGqlSchemaPath: 'Enables saving the detected schema, in GraphQL schema format, to the given location. The directories must exist already, if the file exists it will be overwritten.',
    // bodySizeLimit: 'Set the maximum size of JSON bodies that can be parsed (default 100kB). The size can be given as a human-readable string, such as "200kB" or "5MB" (case insensitive).'
};

const postgraphqlMiddleware = postgraphql.default(consts.db.connectionString, process.env.DB_SCHEMA, options);

module.exports = postgraphqlMiddleware;