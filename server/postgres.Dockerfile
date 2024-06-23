FROM postgres:16-alpine

WORKDIR /

COPY ./src/postgresClient/schema.sql ./docker-entrypoint-initdb.d/

ENV POSTGRES_PASSWORD='postgres'
