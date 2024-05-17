import { ApolloServer } from '@apollo/server';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import pg from './postgresClient/pgClient.js';
import { createApplication } from 'graphql-modules';
import { bookmodule } from './query/book/book.module.js';

async function server() {
  try {
    const app = express();

    const application = createApplication({
      modules: [bookmodule],
    });

    const executor = application.createApolloExecutor();
    const schema = application.schema;

    const appoloServer = new ApolloServer({
      gateway: {
        async load() {
          return { executor };
        },
        onSchemaLoadOrUpdate(callback) {
          callback({ apiSchema: schema } as any);
          return () => {};
        },
        async stop() {},
      },
    });

    await appoloServer.start();

    app.use('/', express.json(), expressMiddleware(appoloServer));

    app.listen(3000, () => console.log(`the server is started at port `));
  } catch (error) {
    console.log('some error occured while running the apollo server', error);
  }
}

server();
