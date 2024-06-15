import { Date } from '../../customScalars/DateScalar.js';
import { NonEmptyString } from '../../customScalars/nonEmptyString.js';
import {
  GetTestBasedOnOptions,
  GetUserData,
  GetUserPersonalTestData,
  PurchaseOneTimeSubscription,
  SaveUserTestData,
} from './resolverHelpers.js';

const resolvers = {
  NonEmptyString,
  Date,
  Query: {
    GetUserData,
    GetTestBasedOnOptions,
    GetUserPersonalTestData,
  },
  Mutation: {
    SaveUserTestData,
    PurchaseOneTimeSubscription
  },
};

export default resolvers;
