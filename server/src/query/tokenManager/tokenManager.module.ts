import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { __dirname } from '../../utils/dirname';
import { join } from 'path';
import tokenResolvers from './resolvers';

const tokenModule = createModule({
  id: 'token-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(
    join(__dirname, '../query/tokenManager/schema.graphql'),
  ),
  resolvers: [tokenResolvers],
});

export default tokenModule;
