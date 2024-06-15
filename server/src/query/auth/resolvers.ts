import { NonEmptyString } from '../../customScalars/nonEmptyString.js';
import {
  GoogleLogin,
  LoginUser,
  RefreshUser,
  SignUpUser,
} from './resolverHelpers.js';

const resolvers = {
  NonEmptyString,
  Mutation: {
    LoginUser,
    SignUpUser,
    GoogleLogin,
    RefreshUser,
  },
};

export default resolvers;
