const { PGHOST, PGDATABASE, DB_SCHEMA, PGUSER, PGPASSWORD, DATABASE_URL } = process.env;

const connectionString = DATABASE_URL || `postgresql://${PGHOST}:5432/${PGDATABASE}`;
console.log('executing migrations...');
require('child_process').execSync(
	`flyway -url="jdbc:${connectionString}" -schemas=${DB_SCHEMA} -user=${PGUSER} -password=${PGPASSWORD} -locations=filesystem:./migrations/sql migrate`,
	{ stdio: [0, 1, 2] }
);
