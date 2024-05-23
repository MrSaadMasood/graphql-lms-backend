FROM postgres:16-alpine3.19

WORKDIR /

COPY ./src/postgresClient/schema.sql ./docker-entrypoint-initdb.d/


ENV POSTGRES_PASSWORD='postgres'
