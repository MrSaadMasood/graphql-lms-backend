import { createModule } from 'graphql-modules';
import bookResolver from './resolver.js';
import { loadFilesSync } from '@graphql-tools/load-files';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const bookmodule = createModule({
  id: 'book-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, './type.graphql')),
  resolvers: [bookResolver],
});
