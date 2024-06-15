import { NonEmptyString } from '../../customScalars/nonEmptyString.js';
import {
  DeleteTestMCQ,
  GetAllMCQBasedOnAcademy,
  GetSpecificMCQ,
  SearchMCQBasedOnFilters,
  UpdateTestMCQ,
} from './resolverHelpers.js';

const resolvers = {
  NonEmptyString,
  Query: {
    SearchMCQBasedOnFilters,
    GetSpecificMCQ,
    GetAllMCQBasedOnAcademy,
  },
  Mutation: {
    UpdateTestMCQ,
    DeleteTestMCQ,
  },
};

export default resolvers;
