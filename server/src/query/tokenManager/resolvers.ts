import { BuyMoreTokens, ConsumeToken } from './resolverHelpers';

const resolvers = {
  Mutation: {
    ConsumeToken,
    BuyMoreTokens,
  },
};

export default resolvers;
