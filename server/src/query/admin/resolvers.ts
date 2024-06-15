import { NonEmptyString } from '../../customScalars/nonEmptyString';
import {
  DeleteTestMCQ,
  GetAllMCQBasedOnAcademy,
  GetSpecificMCQ,
  SearchMCQBasedOnFilters,
  UpdateTestMCQ,
} from './resolverHelpers';

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
