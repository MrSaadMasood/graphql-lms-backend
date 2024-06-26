import { ApolloServer } from '@apollo/server';
import { WebSocketServer } from 'ws';
import { useServer } from "graphql-ws/lib/use/ws"
import http from 'http'
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { createApplication } from 'graphql-modules';
import adminModule from './query/admin/admin.module';
import authModule from './query/auth/auth.module';
import tokensModule from './query/tokenManager/tokenManager.module';
import userModule from './query/user/user.module';
import uploadCSVRouter from './routes/uploadCSVRouter';
import { authenticateAdmin, context } from './utils/helperFunctions';
import env from "./zodSchema/envValidator"
import compression from 'compression'
import helmet from "helmet"
import cors from "cors"
import { PubSub } from "graphql-subscriptions"
const { PORT } = env

const app = express();
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json());
const httpServer = http.createServer(app)
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/"
})

const application = createApplication({
  modules: [authModule, tokensModule, userModule, adminModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub()
    }
  ]
});

const executor = application.createApolloExecutor();
const subscribe = application.createSubscription()
const schema = application.schema;

const serverCleanup = useServer({ schema, subscribe }, wsServer)
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
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ],
});

async function server() {
  try {
    if (process.env.NODE_ENV === 'test') return;
    await apolloServer.start();
    app.use(
      '/upload',
      express.urlencoded({ extended: false }),
      authenticateAdmin,
      uploadCSVRouter,
    );
    app.use('/', expressMiddleware(apolloServer, {
      context: context
    }));
    httpServer.listen(PORT, () => console.log(`the serve is now running`, PORT));
  } catch (error) {
    console.log('some error occured while running the apollo server', error);
    await apolloServer.stop();
    await serverCleanup.dispose()
  }
}

server();

export default apolloServer;
export { app };
