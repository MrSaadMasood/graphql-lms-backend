import { Tokens } from '../../__generated__/graphql';
import { apiPost, loginUserQuery } from '../testUtils/testUtils';

type RefreshInputType = Omit<Tokens, 'accessToken'>;

describe('should test the refresh accesstoken functinality', () => {
  let loggedInUser: RefreshInputType;
  beforeAll(async () => {
    const response = await apiPost(loginUserQuery);
    const copiedReponse = response.body.data.LoginUser;
    delete copiedReponse.accessToken;
    loggedInUser = copiedReponse;
  });
  it('shoudl successfully refresh the token', async () => {
    const refreshUserQuery = {
      query: `mutation($input: RefreshUserInput!){
      RefreshUser(input: $input) {
    accessToken
  }
}`,
      variables: {
        input: {} as RefreshInputType,
      },
    };
    refreshUserQuery.variables.input = loggedInUser;
    const respone = await apiPost(refreshUserQuery);
    expect(respone.body.data.RefreshUser).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );
  });

  it('should successfully refresh the google user', async () => {
    const refreshUserQuery = {
      query: `mutation($input: RefreshUserInput!){
      RefreshUser(input: $input) {
    accessToken
  }
}`,
      variables: {
        input: {} as RefreshInputType,
      },
    };
    refreshUserQuery.variables.input = loggedInUser;
    refreshUserQuery.variables.input.login_method = 'google';
    const respone = await apiPost(refreshUserQuery);

    expect(respone.body.data.RefreshUser).toEqual({
      accessToken: 'googleRefreshedToken',
    });
  });
});

describe('should update the role from "user" to "admin"', () => {
  const updateUserStatusQuery = {
    query: `mutation($email: NonEmptyString!) { 
      UpgradeToAdmin(email: $email) {
        isMadeAdmin
      }
    }`,
    variables: {
      email: "saad@gmail.com"
    }
  }

  it("should upgrade the role 'user' to 'admin'", async () => {
    const response = await apiPost(updateUserStatusQuery)
    expect(response.body.data.UpgradeToAdmin).toEqual({
      isMadeAdmin: true
    })
  })
})
