import { ApolloServer } from '@apollo/server';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { createApplication } from 'graphql-modules';
import { bookmodule } from './query/book/book.module';

const app = express();

const application = createApplication({
  modules: [bookmodule],
});

const executor = application.createApolloExecutor();
const schema = application.schema;

const apolloServer = new ApolloServer({
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

async function server() {
  try {
    await apolloServer.start();
    app.use('/', express.json(), expressMiddleware(apolloServer));
    app.listen(3000, () => console.log(`the server is started at port `));
  } catch (error) {
    console.log('some error occured while running the apollo server', error);
    await apolloServer.stop();
  }
}

server();
export default apolloServer;
export { app };
