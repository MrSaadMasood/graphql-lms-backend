import { ApolloServer } from '@apollo/server';
import uploadCSVRouter from './routes/uploadCSVRouter';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { createApplication } from 'graphql-modules';
import authModule from './query/auth/auth.module';

const app = express();
app.use(express.json());
const application = createApplication({
  modules: [authModule],
});

const executor = application.createApolloExecutor();
const schema = application.schema;

const apolloServer = new ApolloServer({
  gateway: {
    async load() {
      return { executor };
    },
    onSchemaLoadOrUpdate(callback) {
      callback({ apiSchema: schema, coreSupergraphSdl: '' });
      return () => {};
    },
    async stop() {},
  },
});

async function server() {
  try {
    if (process.env.NODE_ENV === 'test') return;
    await apolloServer.start();
    app.use(
      '/upload',
      express.urlencoded({ extended: false }),
      uploadCSVRouter,
    );
    app.use('/', expressMiddleware(apolloServer));
    app.listen(3000, () => console.log(`the server is started at port `));
  } catch (error) {
    console.log('some error occured while running the apollo server', error);
    await apolloServer.stop();
  }
}

server();

export default apolloServer;
export { app };
