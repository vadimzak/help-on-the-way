const postgraphql = require('postgraphql');
const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, DB_SCHEMA, JWT_SECRET } = process.env;
const CONNECTION_STRING = `postgres://${PGHOST}:${PGPORT}/${PGDATABASE}`;
const OPTIONS = {
    // classicIds: 'Enables classic ids for Relay support. Instead of using the field name nodeId for globally unique ids, PostGraphQL will instead use the field name id for its globally unique ids. This means that table id columns will also get renamed to rowId.',
    // dynamicJson: 'Setting this to true enables dynamic JSON which will allow you to use any JSON as input and get any arbitrary JSON as output. By default JSON types are just a JSON string.',
    // disableDefaultMutations: 'Setting this to true will prevent the creation of the default mutation types & fields. Database mutation will only be possible through Postgres functions.',
    graphiql: true, // 'Set this to true to enable the GraphiQL interface.',
    // graphqlRoute: 'The endpoint the GraphQL executer will listen on. Defaults to /graphql.',
    // graphiqlRoute: 'The endpoint the GraphiQL query interface will listen on (NOTE: GraphiQL will not be enabled unless the graphiql option is set to true). Defaults to /graphiql.',
    pgDefaultRole: PGUSER, // The default Postgres role to use. If no role was provided in a provided JWT token, this role will be used.',
    jwtSecret: JWT_SECRET, // 'The secret for your JSON web tokens. This will be used to verify tokens in the Authorization header, and signing JWT tokens you return in procedures.',
    // jwtAudiences: 'The audiences to use when verifying the JWT token. If not set the audience will be ["postgraphql"].',
    // jwtRole: 'An array of strings describing the dotted path in the JWT from which to extract the postgres role. If none is provided it will use the key role on the root of the jwt. Defaults to ["role"].',
    // jwtPgTypeIdentifier: "TODO", //'The Postgres type identifier for the compound type which will be signed as a JWT token if ever found as the return type of a procedure. Can be of the form: my_schema.my_type. You may use quotes as needed: "my-special-schema".my_type.',
    watchPg: true, //'When true, PostGraphQL will watch your database schemas and re-create the GraphQL API whenever your schema changes, notifying you as it does. This feature requires an event trigger to be added to the database by a superuser. When enabled PostGraphQL will try to add this trigger, if you did not connect as a superuser you will get a warning and the trigger won’t be added.',
    // showErrorStack: 'Enables adding a stack field to the error response. Can be either the boolean true (which results in a single stack string) or the string json (which causes the stack to become an array with elements for each line of the stack).',
    // extendedErrors: 'Extends the error response with additional details from the Postgres error. Example: ["hint", "detail", "errcode"]. Default is [].',
    // disableQueryLog: 'Turns off GraphQL query logging. By default PostGraphQL will log every GraphQL query it processes along with some other information. Set this to true to disable that feature.',
    // enableCors: 'Enables some generous CORS settings for the GraphQL endpoint. There are some costs associated when enabling this, if at all possible try to put your API behind a reverse proxy.',
    // exportJsonSchemaPath: 'Enables saving the detected schema, in JSON format, to the given location. The directories must exist already, if the file exists it will be overwritten.',
    // exportGqlSchemaPath: 'Enables saving the detected schema, in GraphQL schema format, to the given location. The directories must exist already, if the file exists it will be overwritten.',
    // bodySizeLimit: 'Set the maximum size of JSON bodies that can be parsed (default 100kB). The size can be given as a human-readable string, such as "200kB" or "5MB" (case insensitive).'
};

const postgraphqlMiddleware = postgraphql.default(CONNECTION_STRING, DB_SCHEMA, OPTIONS);

module.exports = postgraphqlMiddleware;

