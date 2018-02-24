const {
	PGHOST,
	PGDATABASE,
	DB_SCHEMA,
	PGUSER,
	PGPASSWORD,
	DATABASE_URL,
	DO_MIGRATIONS
} = process.env;
if (DO_MIGRATIONS == 'true') {
	const connectionString = DATABASE_URL || `postgresql://${PGHOST}:5432/${PGDATABASE}`;
	console.log('executing migrations...');
	require('child_process').execSync(
		`flyway -url="jdbc:${connectionString}" -schemas=${DB_SCHEMA} -user=${PGUSER} -password=${PGPASSWORD} -locations=filesystem:./migrations/sql migrate`,
		{ stdio: [0, 1, 2] }
	);
} else {
	console.log('No DO_MIGRATIONS flag, skiping migrations...');
}
