# GraphQL LMS Backend

This the backend of a learning management system which basically focuses on Test conduction using MCQs.

## Features

- **OAuth Authentication with Google** and In-house JWT Authentication.

- **RBAC** for Users and Admins.

- Admins can Upload the CSV file which following the format and it will populate the database with the MCQs.

- Admins can delete, update, and search MCQs based on filters like search text, paper year etc.

- Users can get tests based on different filters like paper category, paper subject, paper year.

- You can save user test data, get general user data like **Subscription Status**, and personal user data like **Total MCQs Solved,
  Correct and Wrong MCQs** etc.

- User can purchase **Life-Time Subscription** or can buy more tokens ( This endpoint is mocked With Stripe as its not safe to handle user data on the server )

- Users are given free tokens on Signup which get deducted everytime they complete a test.

- Stripe Integration

- GraphQL Publish Subscribe model for Real Time Stats Update

- Backend is containerized.

## Pre-Requisites

**Postgres** database must be running in the background with port **5432** exposed

## Technologies-Used

- GraphQl Modules for Deeply Modular Code.

- GraphQL Codegen for Auto-Type Generation from .graphql filters

- PubSubs for Real Time Updates

- Zod For environmental variables validation

- pg module for Postgres

- Supertest and Jest for testing

- Multer for handling multipart forms

- JWT for authentication

- Custom Scalars for GraphQL

- Stripe for payments (payments are mocked with Stripe)

- CSV Parser to parse the rows of the CSV file

## Installation

For installation you need to clone the repo in you local machine.

```
https://github.com/MrSaadMasood/graphql-lms-backend/tree/main
```

then navigate to the directory for server as **/server** and run

```
npm ci
```

for clean and manual installation of the dependencies

## Running the Application

To Run the containerized application, you need to create a **.env** file in the root of **/server** and you must provide these variables
in the .env filters

```

ACCESS_SECRET_USER // a random hex string

ACCESS_SECRET_ADMIN // a random hex string

REFRESH_SECRET_USER // a random hex string

REFRESH_SECRET_ADMIN // a random hex string

GOOGLE_CLIENT_SECRET

GOOGLE_CLIENT_ID

STRIPE_SECRET_KEY

STRIPE_PUBLISHED_KEY

POSTGRES_USER // defaults to postgres

POSTGRES_PASSWORD // defaults to postgres

POSTGRES_DATABASE default to lms

POSTGRES_PORT // defaults to 5432

POSTGRES_HOST // default to ""

PORT // server port number

```

After giving values to the env you can run the following commands and the container
will spin up for you

- For **Development Container**

```
docker compose -f docker-compose.dev.yml up
```

- For Production Container

```
docker compose up
```

The above will spin up the postgres server and start the server for you.
If you want to start the sever on you own you can spin up the postgres container using

```
docker compose -f docker-compose.postgres.yml up
```

**Note**: If you are running the postgres container on you own you must provide a schema to the database. When the application starts using containers, it automatically runs the **.sql** file and defines the postges schema

For manual approach the schema.sql is located at

- **/src/postgresClient/schema.sql**

## Tests

To run the test you must:

- Spin up the postgres database using either throw container using the schema.sql defined schema by either running the

```
docker compose -f docker-compose.postgres.yml up
```

- run:

```
npm run test
```

**NOTE** all the test will pass on on first run. For every subsequent / rerun you must stop the container and remove the image using

```
docker compose -f docker-compose.postgres.yml down --volumes --rmi all
```

This is because there is no tests database and the tests are run on the develepment/prod database and many tests have hard coded values that will fail to fulfill the conditions due to mutations in the data from the test run. That's why tests need fresh instance of database to spinned up for every test run

### Reminder

Every time you run

```
npm run generate
```

to generate the schema from the .graphql files using GraphQL codegen you must go to the **src/**generated**/module-types.ts** file and change the path of first line to **./graphql**. This is necessary for the correct types to be accessible during the development.
