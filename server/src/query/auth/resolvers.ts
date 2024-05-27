import {
  GoogleLogin,
  LoginUser,
  RefreshUser,
  SignUpUser,
} from './resolverHelpers';

const resolvers = {
  Mutation: {
    LoginUser,
    SignUpUser,
    GoogleLogin,
    RefreshUser,
  },
};

export default resolvers;
