import request from 'supertest';
import apolloServer, { app } from '../app';

console.log('the dirname for test using process is', process.cwd());
jest.mock('../utils/dirname', () => ({
  __dirname: `${process.cwd()}/src/utils/`,
}));
const api = request(app);

const queryData = {
  query: ` query getBook {
  Book { 
  name
  }
}
`,
  variables: {},
};

describe('it should tests this', () => {
  afterAll(async () => await apolloServer.stop());
  it('should run successfully', async () => {
    const response = await api.post('/').send(queryData);
    expect(response.body).toStrictEqual({ data: { Book: { name: 'emily' } } });
  });
});
