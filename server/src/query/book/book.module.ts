import { createModule } from 'graphql-modules';
import bookResolver from './resolver';
import { loadFilesSync } from '@graphql-tools/load-files';
import { join } from 'path';
import { __dirname } from '../../utils/dirname';

export const bookmodule = createModule({
  id: 'book-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, '../query/book/type.graphql')),
  resolvers: [bookResolver],
});
