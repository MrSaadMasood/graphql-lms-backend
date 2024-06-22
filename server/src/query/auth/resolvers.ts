import { Email } from '../../customScalars/EmailScalar';
import { NonEmptyString } from '../../customScalars/nonEmptyString';
import {
  GoogleLogin,
  LoginUser,
  RefreshUser,
  SignUpUser,
} from './resolverHelpers';

const resolvers = {
  Email,
  NonEmptyString,
  Mutation: {
    LoginUser,
    SignUpUser,
    GoogleLogin,
    RefreshUser,
  },
};

export default resolvers;
