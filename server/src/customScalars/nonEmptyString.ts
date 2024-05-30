import { GraphQLScalarType, Kind } from "graphql"

export const NonEmptyString = new GraphQLScalarType({
  name: "NonEmptyString",
  description: "Scalar for a string that must be non empty",
  serialize: (value) => {
    return stringValidator(value)
  },
  parseValue: (value) => {
    return stringValidator(value)
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING && ast.value.length > 0) return ast.value
    throw new TypeError("expected a non empty string")
  }
})

function stringValidator(value: unknown) {
  if (typeof value === "string" && value.length > 0) return value
  throw new TypeError("Empty string is recieved")
}


