import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../../app';

type query = {
  query: string;
  variables: unknown;
};

const api = request(app);

export const apiPost = async (query: query) => {
  return await api.post('/').send(query);
};

export const createRandomUser = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  login_method: 'normal',
  password: 'Random.123',
});

export const loginUserQuery = {
  query: `mutation loginUser($input: LoginUserInput!) {
  LoginUser(input: $input) {
    accessToken,
    refreshToken,
    login_method,
    role
  }
}`,
  variables: {
    input: {
      email: 'hamza@gmail.com',
      password: 'hamza.123',
    },
  },
};
