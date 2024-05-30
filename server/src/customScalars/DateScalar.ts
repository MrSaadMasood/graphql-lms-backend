import { GraphQLScalarType, Kind } from "graphql"
import { dateValidator } from "../utils/helperFunctions"
export const Date = new GraphQLScalarType({
  name: "Date",
  description: "Scalar for Date",
  serialize: (value) => {
    return dateValidator(value)
  },
  parseValue: (value) => {
    return dateValidator(value)
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return dateValidator(ast.value)
    }
    throw new TypeError("expected a date string")
  }
})

