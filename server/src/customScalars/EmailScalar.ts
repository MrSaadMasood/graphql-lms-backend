import { GraphQLScalarType, Kind } from 'graphql';
import { emailValidator } from '../utils/helperFunctions';
export const Email = new GraphQLScalarType({
  name: 'Email',
  description: 'Scalar for Email',
  serialize: (value) => {
    return emailValidator(value);
  },
  parseValue: (value) => {
    return emailValidator(value);
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return emailValidator(ast.value);
    }
    throw new TypeError('expected a date string');
  },
});
