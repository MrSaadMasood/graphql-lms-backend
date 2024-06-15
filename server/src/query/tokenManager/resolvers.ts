import { BuyMoreTokens, ConsumeToken } from './resolverHelpers.js';

const resolvers = {
  Mutation: {
    ConsumeToken,
    BuyMoreTokens,
  },
};

export default resolvers;
