const { PGHOST, PGPORT, PGDATABASE, DB_SCHEMA, PGUSER, PGPASSWORD } = process.env;
require('child_process')
    .execSync(`flyway -url=jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE} -schemas=${DB_SCHEMA} -user=${PGUSER} -password=${PGPASSWORD} migrate`, { stdio: [0, 1, 2] });
