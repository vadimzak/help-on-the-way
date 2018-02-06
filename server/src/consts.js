const { PGHOST, PGPORT, PGUSER, PGDATABASE, JWT_SECRET, JWT_AUDIENCES } = process.env;

module.exports = {
    db: {
        privateSchemaName: 'help_private',
        sessionTableName: 'session',
        connectionString: `postgres://${PGHOST}:${PGPORT}/${PGDATABASE}`,
    },
    postgraphql: {
        schemaOptions: {
            // classicIds: 'Enables classic ids for Relay support. Instead of using the field name nodeId for globally unique ids, PostGraphQL will instead use the field name id for its globally unique ids. This means that table id columns will also get renamed to rowId.',
            dynamicJson: true, //'Setting this to true enables dynamic JSON which will allow you to use any JSON as input and get any arbitrary JSON as output. By default JSON types are just a JSON string.',
            // disableDefaultMutations: 'Setting this to true will prevent the creation of the default mutation types & fields. Database mutation will only be possible through Postgres functions.',
            jwtSecret: JWT_SECRET, // 'The secret for your JSON web tokens. This will be used to verify tokens in the Authorization header, and signing JWT tokens you return in procedures.',
            jwtPgTypeIdentifier: 'help.jwt_token' //'The Postgres type identifier for the compound type which will be signed as a JWT token if ever found as the return type of a procedure. Can be of the form: my_schema.my_type. You may use quotes as needed: "my-special-schema".my_type.',
        },
        contextOptions: {
            pgDefaultRole: PGUSER, // The default Postgres role that will be used if no role was found in jwtToken. It is a best security practice to always have a value for this option even though it is optional.
            jwtAudiences: JWT_AUDIENCES
        }
    }
}