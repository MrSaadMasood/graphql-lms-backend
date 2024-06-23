import { Email } from '../../customScalars/EmailScalar';
import { NonEmptyString } from '../../customScalars/nonEmptyString';
import {
  GoogleLogin,
  LoginUser,
  RefreshUser,
  SignUpUser,
  UpgradeToAdmin
} from './resolverHelpers';

const resolvers = {
  Email,
  NonEmptyString,
  Query: {
    Ping() {
      return "Pong"
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
