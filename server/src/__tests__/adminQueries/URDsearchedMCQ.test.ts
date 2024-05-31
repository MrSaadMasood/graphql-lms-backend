import { apiPost } from '../testUtils/testUtils';

describe('test the get spcific mcq from the table functionlity', () => {
  const getSpecificMcqQuery = {
    query: `query($getSpecificMcqId: Int!){
      GetSpecificMCQ(id: $getSpecificMcqId) {
        id,
        statement,
        paper_year,
        paper_category
      }
    }`,
    variables: {
      getSpecificMcqId: 1,
    },
  };
  it('should return the required mcq based on the correct id', async () => {
    const response = await apiPost(getSpecificMcqQuery);
    expect(response.body.data.GetSpecificMCQ).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        statement: expect.any(String),
        paper_year: expect.any(Number),
        paper_category: expect.any(String),
      }),
    );
  });
  it('nagetive : should fail to get the mcq if the id is incorrect', async () => {
    getSpecificMcqQuery.variables.getSpecificMcqId = 10000000;
    const response = await apiPost(getSpecificMcqQuery);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.data).toBeNull();
  });
});

describe('tests the update already present mcq correctly', () => {
  const updateMCQInput = {
    id: 1,
    statement: ' which is this mcq changed from the test',
    option_a: 'yes',
    option_b: 'no',
    option_c: 'whatever',
    correct: 'A',
    explanation: 'i can do whatever i want',
    subject: 'English',
    paper_year: 2021,
    paper_category: 'IELTS',
    difficulty: 'hard',
  };
  const updateMCQQuery = {
    query: `mutation($input: UpdateMCQInput!) {
      UpdateTestMCQ(input: $input)
    }`,
    variables: {
      input: updateMCQInput,
    },
  };
  it('should update the mcq based on the params', async () => {
    const response = await apiPost(updateMCQQuery);
    expect(response.body.data.UpdateTestMCQ).toBe(true);
  });

  it('negative: should fail to update the mcq if the id is incorrect', async () => {
    updateMCQQuery.variables.input.id = 10000000;
    const error = await apiPost(updateMCQQuery);
    expect(error.body.data).toBeNull();
    expect(error.body.errors).toHaveLength(1);
  });
});

describe('test the deletion of a specific mcq from the database', () => {
  const deleteMCQQuery = {
    query: `mutation($deleteTestMcqId: Int!){
    DeleteTestMCQ(id: $deleteTestMcqId)
  }`,
    variables: {
      deleteTestMcqId: 1,
    },
  };

  it('should successfully delete the mcq from the database', async () => {
    const response = await apiPost(deleteMCQQuery);

    expect(response.body.data.DeleteTestMCQ).toBe(true);
  });

  it('negative: should fail to delete the mcq if the id is incorrect', async () => {
    deleteMCQQuery.variables.deleteTestMcqId = 10000000;
    const response = await apiPost(deleteMCQQuery);

    expect(response.body.data).toBeNull();
    expect(response.body.errors).toHaveLength(1);
  });
});

describe('tests the get mcqs based on the academy name and offset using pagination', () => {
  const getPaginatedMCQQuery = {
    query: `query($academyName: NonEmptyString!, $offset: Int!) {
      GetAllMCQBasedOnAcademy(academyName: $academyName, offset: $offset) {
        id,
        statement
      }
    }`,
    variables: {
      academyName: 'British Council',
      offset: 0,
    },
  };

  it('should return the paginate based mcqs', async () => {
    const response = await apiPost(getPaginatedMCQQuery);
    expect(response.body.data.GetAllMCQBasedOnAcademy).toHaveLength(4);
    expect(response.body.data.GetAllMCQBasedOnAcademy[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        statement: expect.any(String),
      }),
    );
  });

  it('negative: should fail to give the paginate mcqs if the academy name is incorrect', async () => {
    getPaginatedMCQQuery.variables.academyName = 'hola';
    const error = await apiPost(getPaginatedMCQQuery);
    expect(error.body.data).toBeNull();
    expect(error.body.errors).toHaveLength(1);
  });
});
