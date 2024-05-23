import { Tokens } from '../../__generated__/graphql';
import { apiPost, loginUserQuery } from '../testUtils/testUtils';
describe('should test the refresh accesstoken functinality', () => {
  let loggedInUser: Omit<Tokens, 'accessToken'>;
  beforeAll(async () => {
    const response = await apiPost(loginUserQuery);
    const copiedReponse = { ...response.body.data.LoginInUser };
    delete copiedReponse.accessToken;
    loggedInUser = copiedReponse;
  });
  const refreshUserQuery = {
    query: `mutation($input: RefreshUserInput!){
      RefreshUser(input: $input) {
    accessToken
  }
}`,
    variables: {
      input: loggedInUser!,
    },
  };
  it('shoudl successfully refresh the token', async () => {
    refreshUserQuery.variables.input = loggedInUser;
    const respone = await apiPost(refreshUserQuery);
    console.log('the refresh user', respone.body.data);
    console.log('the refresh user', respone.body.errors);
    expect(respone.body.data.RefreshUser).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );
  });

  it('should successfully refresh the google user', async () => {
    refreshUserQuery.variables.input = loggedInUser;
    refreshUserQuery.variables.input.login_method = 'google';
    const respone = await apiPost(refreshUserQuery);
    expect(respone.body.data.RefreshUser).toEqual({
      accessToken: 'googleRefreshedToken',
    });
  });
});
