import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { __dirname } from '../../utils/dirname.js';
import { join } from 'path';
import authResolvers from './resolvers.js';
const authModule = createModule({
  id: 'auth-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, '../query/auth/schema.graphql')),
  resolvers: [authResolvers],
});
export default authModule;
