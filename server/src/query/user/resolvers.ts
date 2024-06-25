import { Date } from '../../customScalars/DateScalar';
import { NonEmptyString } from '../../customScalars/nonEmptyString';
import { GENERAL_STATS, pubsub } from '../../pubSub/pubSub';
import {
  GetTestBasedOnOptions,
  GetUserData,
  GetUserPersonalTestData,
  PurchaseOneTimeSubscription,
  SaveUserTestData,
} from './resolverHelpers';

const resolvers = {
  NonEmptyString,
  Date,
  Subscription: {
    generalStats: {
      subscribe: () => pubsub.asyncIterator(GENERAL_STATS)
    }
  },
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
