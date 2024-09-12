var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { ApolloServer } from '@apollo/server';
import { WebSocketServer } from 'ws';
import { useServer } from "graphql-ws/lib/use/ws";
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createApplication } from 'graphql-modules';
import adminModule from './query/admin/admin.module.js';
import authModule from './query/auth/auth.module.js';
import tokensModule from './query/tokenManager/tokenManager.module.js';
import userModule from './query/user/user.module.js';
import uploadCSVRouter from './routes/uploadCSVRouter.js';
import { authenticateAdmin, context } from './utils/helperFunctions.js';
import env from "./zodSchema/envValidator.js";
import compression from 'compression';
import helmet from "helmet";
import cors from "cors";
import { PubSub } from "graphql-subscriptions";
const { PORT } = env;
const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/"
});
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
const subscribe = application.createSubscription();
const schema = application.schema;
const serverCleanup = useServer({ schema, subscribe }, wsServer);
const apolloServer = new ApolloServer({
  gateway: {
    load() {
      return __awaiter(this, void 0, void 0, function* () {
        return { executor };
      });
    },
    onSchemaLoadOrUpdate(callback) {
      callback({ apiSchema: schema, coreSupergraphSdl: '' });
      return () => { };
    },
    stop() {
      return __awaiter(this, void 0, void 0, function* () { });
    },
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      serverWillStart() {
        return __awaiter(this, void 0, void 0, function* () {
          return {
            drainServer() {
              return __awaiter(this, void 0, void 0, function* () {
                yield serverCleanup.dispose();
              });
            }
          };
        });
      }
    }
  ],
});
function server() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      if (process.env.NODE_ENV === 'test')
        return;
      yield apolloServer.start();
      app.use('/upload', express.urlencoded({ extended: false }), authenticateAdmin, uploadCSVRouter);
      app.use('/', expressMiddleware(apolloServer, {
        context: context
      }));
      httpServer.listen(PORT || 3000, () => console.log(`the serve is now running`, PORT));
    }
    catch (error) {
      console.log('some error occured while running the apollo server', error);
      yield apolloServer.stop();
      yield serverCleanup.dispose();
    }
  });
}
server();
export default apolloServer;
export { app };
