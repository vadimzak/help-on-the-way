const { PGHOST, PGPORT, PGDATABASE, DB_SCHEMA, PGUSER, PGPASSWORD, PROD_ENV, DATABASE_URL } = process.env;
if (PROD_ENV == 'true') {
    require('child_process')
    .execSync(`flyway -url="jdbc:${DATABASE_URL}" -user=${PGUSER} -password=${PGPASSWORD} -locations=filesystem:./migrations/sql migrate`, { stdio: [0, 1, 2] });
}  
