import { GraphQLScalarType, Kind } from 'graphql';
import { stringValidator } from '../utils/helperFunctions.js';
export const NonEmptyString = new GraphQLScalarType({
  name: 'NonEmptyString',
  description: 'Scalar for a string that must be non empty',
  serialize: (value) => {
    return stringValidator(value);
  },
  parseValue: (value) => {
    return stringValidator(value);
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING && ast.value.length > 0)
      return ast.value;
    throw new TypeError('expected a non empty string');
  },
});
