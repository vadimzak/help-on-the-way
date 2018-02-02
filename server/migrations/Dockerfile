FROM boxfuse/flyway:5.0.6-alpine

RUN apk update && apk add bash && apk add postgresql-client

COPY ./wait-for-postgres.sh /usr/local/bin

ENTRYPOINT [ "wait-for-postgres.sh", "flyway", "-url=jdbc:postgresql://db:5432/${PGDATABASE}", "-schemas=${DB_SCHEMA}", "-user=${PGUSER}", "-password=${PGPASSWORD}", "migrate"]