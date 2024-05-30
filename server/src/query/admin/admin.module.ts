import { createModule } from 'graphql-modules';
import { __dirname } from '../../utils/dirname';
import { join } from 'path';
import adminResolvers from "./resolvers"
import { loadFilesSync } from '@graphql-tools/load-files';

const userModule = createModule({
  id: 'admin-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, '../query/admin/schema.graphql')),
  resolvers: [adminResolvers],
});

export default userModule;
