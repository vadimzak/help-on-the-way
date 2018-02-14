const { PGHOST, PGPORT, PGDATABASE, DB_SCHEMA, PGUSER, PGPASSWORD, PROD_ENV } = process.env;
if (PROD_ENV == 'true') {
    require('child_process')
    .execSync(`flyway -url=jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE} -schemas=${DB_SCHEMA} -user=${PGUSER} -password=${PGPASSWORD} migrate`, { stdio: [0, 1, 2] });
} else {
    console.log('skipping migrations...');
}
