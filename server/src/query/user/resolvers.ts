import { Date } from "../../customScalars/DateScalar"
import { NonEmptyString } from "../../customScalars/nonEmptyString"
import { GetTestBasedOnOptions, GetUserData, GetUserPersonalTestData, SaveUserTestData } from "./resolverHelpers"

const resolvers = {
  NonEmptyString,
  Date,
  Query: {
    GetUserData,
    GetTestBasedOnOptions,
    GetUserPersonalTestData
  },
  Mutation: {
    SaveUserTestData
  }
}

export default resolvers
