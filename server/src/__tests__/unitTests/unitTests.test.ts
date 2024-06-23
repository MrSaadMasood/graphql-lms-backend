import { UserContext } from "../../__generated__/types"
import { dateValidator, emailValidator, requestUserExistenceVerifier, stringValidator } from "../../utils/helperFunctions"

const userContext: UserContext = {
  email: "random@gmail.com",
  role: "user",
  id: "1",
  password: "passsword",
  subscription_type: "none",
  last_name: "user",
  first_name: "random",
  free_tokens: 300,
  login_method: "normal"
}
describe('units tests all the helper functions', () => {
  it('should return the date', () => {
    expect(dateValidator(new Date())).toBeInstanceOf(Date)
    expect(dateValidator(new Date())).toBeTruthy()
    expect(dateValidator(new Date())).not.toBeNull()
  })
  it("should throw error if the incorrect string is provided for date", () => {
    expect(() => dateValidator("wrong string")).toThrow()
  })

  it('should return the string ', () => {
    expect(stringValidator("random")).toBe("random")
    expect(stringValidator("random")).toBeTruthy()
    expect(stringValidator("random")).not.toBeNull()
  })

  it('should throw an error if anything other than string is provided', () => {
    expect(() => stringValidator(1)).toThrow()
    expect(() => stringValidator({})).toThrow()
  })

  it("should succesffully check if the correct email is provided", () => {
    expect(emailValidator("random@gmail.com")).toBeTruthy()
    expect(emailValidator("random@gmail.com")).toBe("random@gmail.com")
    expect(emailValidator("random@gmail.com")).not.toBeNull()
  })
  it('should throw an error if correct email is not provided', () => {
    expect(() => emailValidator("random")).toThrow()
    expect(() => emailValidator("random.gmail.com")).toThrow()
  })
  it('should check if the user context exists', () => {
    expect(requestUserExistenceVerifier(userContext)).toEqual(userContext)
  })
  it('should check if the user context exists and the user is an admin', () => {
    userContext.role = "admin"
    expect(requestUserExistenceVerifier(userContext, true)).toEqual(userContext)
  })
  it('should throw an error error if the user context does not exist', () => {
    expect(() => requestUserExistenceVerifier(null)).toThrow()
  })
  it('should throw an error if the user is not an admin', () => {
    userContext.role = "user"
    expect(() => requestUserExistenceVerifier(userContext, true)).toThrow()
  })

})
