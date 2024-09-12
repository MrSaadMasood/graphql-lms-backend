import { Email } from '../../customScalars/EmailScalar.js';
import { NonEmptyString } from '../../customScalars/nonEmptyString.js';
import { GoogleLogin, LoginUser, RefreshUser, SignUpUser, UpgradeToAdmin } from './resolverHelpers.js';
const resolvers = {
  Email,
  NonEmptyString,
  Query: {
    Ping() {
      return "Pong";
    }
  },
  Mutation: {
    LoginUser,
    SignUpUser,
    GoogleLogin,
    RefreshUser,
    UpgradeToAdmin
  },
};
export default resolvers;
