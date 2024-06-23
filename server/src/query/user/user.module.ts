import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { __dirname } from '../../utils/dirname';
import { join } from 'path';
import userResolvers from './resolvers';

const userModule = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, '../query/user/schema.graphql')),
  resolvers: [userResolvers],
});

export default userModule;
