import oAuth2Client from '../../utils/oAuth2Client';
import { apiPost, loginUserQuery } from '../testUtils/testUtils';

describe('tests the login functinality', () => {
  it('should succesfully log the user in', async () => {
    const response = await apiPost(loginUserQuery);
    expect(response.body.data.LoginUser).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    );
  });

  it('negative: should fail to log the user in when wrong password is provided', async () => {
    loginUserQuery.variables.input.password = 'hamaza.999';
    const error = await apiPost(loginUserQuery);
    expect(error.body.errors).toHaveLength(1);
  });

  it('should handle the sql injection correctly', async () => {
    loginUserQuery.variables.input.email = "hamza@gmail.com or '1' = '1' --'";
    const error = await apiPost(loginUserQuery);
    expect(error.body.errors).toHaveLength(1);
  });
});

describe('tests the login functionality using google', () => {
  beforeAll(() => {
    jest.spyOn(oAuth2Client, 'getToken').mockImplementation(() =>
      Promise.resolve({
        tokens: {
          access_token: 'accessToken',
          refresh_token: 'refreshToken',
          id_token: 'id_token',
        },
      }),
    );
    jest.spyOn(oAuth2Client, 'verifyIdToken').mockImplementation(() =>
      Promise.resolve({
        getPayload: jest.fn(() => ({
          name: 'hamza saleem',
          email: 'hamza@gmail.com',
          at_hash: 'hamza.123',
        })),
      }),
    );
  });
  afterAll(() => jest.clearAllMocks());

  it('should succesfully log the google use in', async () => {
    const googleUserLoginQuery = {
      query: `mutation($code: NonEmptyString!){
        GoogleLogin(code: $code) {
        accessToken,
        login_method,
    }
  }`,
      variables: {
        code: 'googleCode',
      },
    };
    const response = await apiPost(googleUserLoginQuery);
    expect(response.body.data.GoogleLogin).toEqual({
      accessToken: expect.any(String),
      login_method: 'google',
    });
    expect(oAuth2Client.verifyIdToken).toHaveBeenCalledTimes(1);
    expect(oAuth2Client.getToken).toHaveBeenCalledTimes(1);
  });
});
