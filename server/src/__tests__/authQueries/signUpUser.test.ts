import { apiPost, createRandomUser } from '../testUtils/testUtils';

describe('tests the user auth queries and mutations', () => {
  const signUpQuery = {
    query: `mutation signUpUser
        ($input : CreateUserInput!){
          SignUpUser(input : $input) {
          isSuccess
  } 
}
`,
    variables: {
      input: createRandomUser(),
    },
  };
  it('should sign up the new user', async () => {
    const response = await apiPost(signUpQuery);
     
    expect(response.body.data).toEqual({ SignUpUser: { isSuccess: true } });
  });

  it('negative: should fail the sign up if the same email is used', async () => {
    signUpQuery.variables.input = {
      first_name: 'hamza',
      last_name: 'saleem',
      email: 'hamza@gmail.com',
      password: 'hamza.123',
      login_method: 'normal',
    };
    const error = await apiPost(signUpQuery);
    expect(error.body.errors).toHaveLength(1);
  });
});
