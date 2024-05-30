import { expressMiddleware } from '@apollo/server/express4';
import apolloServer, { app } from '../app';
import express from 'express';

jest.mock('../utils/dirname.ts', () => ({
  __dirname: `${process.cwd()}/src/utils/`,
}));

jest.mock('../utils/refreshGoogleAccessToken', () => {
  return {
    refreshGoogleAccessToken: jest.fn(() =>
      Promise.resolve({
        access_token: 'googleRefreshedToken',
      }),
    ),
  };
});
beforeAll(async () => {
  await apolloServer.start();
  app.use('/', express.json(), expressMiddleware(apolloServer));
});
afterAll(async () => {
  await apolloServer.stop();
  jest.clearAllMocks();
});
