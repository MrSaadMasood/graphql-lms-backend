import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../../app';

type query = {
  query: string;
  variables: unknown;
};

export const api = request(app);

const adminToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiMzNlYmVkLTlhODktNGUxNS1iOTIwLTg4MDgyYjA2ZjZlZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxOTA2MzE5NH0.7ysKI7SBCZ5tynfD7W153DkXT_HArbOE3XUQBaOVdfY"
const userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0MTUyODRiLTg3YjQtNDIwNi1hNzlmLTViZDYxYjAwZGU5NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5MDYwMTI1fQ.gZebUGvEIEKg7ADdSk1kk9TIVJgLBAx71aJ-azp3YL4"

export const apiPost = async (query: query, isAdmin?: boolean) => {
  return await api.post('/').send(query).set({
    authorization: isAdmin ? adminToken : userToken,
    "x-custom-loginMethod": "normal",
    "x-custom-role": isAdmin ? "admin" : "user"
  });
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
