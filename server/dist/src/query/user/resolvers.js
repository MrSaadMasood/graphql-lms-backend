import { Date } from '../../customScalars/DateScalar.js';
import { NonEmptyString } from '../../customScalars/nonEmptyString.js';
import { GENERAL_STATS, pubsub } from '../../pubSub/pubSub.js';
import { GetTestBasedOnOptions, GetUserData, GetUserPersonalTestData, PurchaseOneTimeSubscription, SaveUserTestData, } from './resolverHelpers.js';
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
