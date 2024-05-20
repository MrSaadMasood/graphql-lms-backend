FROM postgres:16.3-alpine3.19

COPY ./src/postgresClient/schema.sql ./docker-entrypoint-initdb.d/


ENV POSTGRES_PASSWORD='postgres'
