const express = require('express');
const { postgraphql } = require('postgraphql');
const app = express();

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, DB_NAME, DB_SCHEMA, JWT_SECRET } = process.env;
const CONNECTION_STRING = `postgres://${PGHOST}:${PGPORT}/${DB_NAME}`;
const OPTIONS = {
    graphiql: true, // 'Set this to true to enable the GraphiQL interface.',
    pgDefaultRole: PGUSER, // The default Postgres role to use. If no role was provided in a provided JWT token, this role will be used.',
    jwtSecret: JWT_SECRET, // 'The secret for your JSON web tokens. This will be used to verify tokens in the Authorization header, and signing JWT tokens you return in procedures.',
    watchPg: true, //'When true, PostGraphQL will watch your database schemas and re-create the GraphQL API whenever your schema changes, notifying you as it does. This feature requires an event trigger to be added to the database by a superuser. When enabled PostGraphQL will try to add this trigger, if you did not connect as a superuser you will get a warning and the trigger won’t be added.',
};

const postgraphqlMiddleware = postgraphql(CONNECTION_STRING, DB_SCHEMA, OPTIONS);

app.use(postgraphqlMiddleware);

app.listen(3000)
