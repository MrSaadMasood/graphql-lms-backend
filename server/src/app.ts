import { ApolloServer } from '@apollo/server';
import { WebSocketServer } from 'ws';
import { useServer } from "graphql-ws/lib/use/ws"
import { createServer } from 'https'
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { createApplication } from 'graphql-modules';
import adminModule from './query/admin/admin.module';
import authModule from './query/auth/auth.module';
import tokensModule from './query/tokenManager/tokenManager.module';
import userModule from './query/user/user.module';
import uploadCSVRouter from './routes/uploadCSVRouter';
import { context } from './utils/helperFunctions';

const app = express();
app.use(express.json());

const httpServer = createServer(app)
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/"
})
const application = createApplication({
  modules: [authModule, tokensModule, userModule, adminModule],
});

const executor = application.createApolloExecutor();
const schema = application.schema;

const serverCleanup = useServer({ schema }, wsServer)
const apolloServer = new ApolloServer({
  gateway: {
    async load() {
      return { executor };
    },
    onSchemaLoadOrUpdate(callback) {
      callback({ apiSchema: schema, coreSupergraphSdl: '' });
      return () => { };
    },
    async stop() { },
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer })
  ]
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
    app.use('/', expressMiddleware(apolloServer, {
      context: context
    }));
    app.listen(3000, () => console.log(`the server is started at port `));
  } catch (error) {
    console.log('some error occured while running the apollo server', error);
    await apolloServer.stop();
    await serverCleanup.dispose()
  }
}

server();

export default apolloServer;
export { app };
