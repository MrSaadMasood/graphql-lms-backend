import {
  GetTestOptions,
  TestDataSent,
  UserTestDataInput,
} from '../../__generated__/graphql';
import { DbError, InputValidationError } from '../../customErrors/errors';
import pgPool from '../../postgresClient/pgClient';
import {
  getUserDataQuery,
  getUserGeneralTestDataQuery,
  getUserSubjectWiseTestDataQuery,
  saveUserTestDataQuery,
  testBasedOnPaperYearQuery,
  testBasedOnRandomOption,
  testBasedOnSubjectQuery,
} from '../../sqlQueries/reusedSQLQueries';
import { stripe } from '../../stripe/stripe';

export async function GetUserData() {
  const userData = await pgPool.query(getUserDataQuery, ['hamza@gmail.com']);
  if (!userData.rowCount) throw new DbError('failed to get the user Data');
  return userData.rows[0];
}

export async function GetTestBasedOnOptions(
  _parent: unknown,
  { input }: { input: GetTestOptions },
) {
  const {
    paperCategory,
    paperYear,
    paperSubject,
    giveRandomTest,
    academyName,
    limit,
  } = input;
  if (paperYear) {
    const specificYearPaper = await pgPool.query<TestDataSent>(
      testBasedOnPaperYearQuery,
      [paperYear, paperCategory, academyName],
    );
    if (!specificYearPaper.rowCount)
      throw new DbError('failed to get the specific year test');
    return specificYearPaper.rows;
  }
  if (paperSubject) {
    const specificSubjectMCQ = await pgPool.query<TestDataSent>(
      testBasedOnSubjectQuery,
      [paperCategory, academyName, paperSubject],
    );
    if (!specificSubjectMCQ.rowCount)
      throw new DbError('failed to get the specific year test');
    return specificSubjectMCQ.rows;
  }
  if (giveRandomTest) {
    const controlledLimit = limit || 20;
    const randomMCQ = await pgPool.query<TestDataSent>(
      testBasedOnRandomOption,
      [paperCategory, academyName, controlledLimit],
    );
    if (!randomMCQ.rowCount)
      throw new DbError('failed to get the random tests');
    return randomMCQ.rows;
  }
  throw new InputValidationError('inputs provided are incorrect');
}

export async function SaveUserTestData(
  _parent: unknown,
  {
    input: { totalSolved, totalWrong, totalCorrect, subject },
  }: { input: UserTestDataInput },
) {
  const savedUserTestData = await pgPool.query(saveUserTestDataQuery, [
    'f415284b-87b4-4206-a79f-5bd61b00de97',
    subject,
    totalSolved,
    totalCorrect,
    totalWrong,
  ]);
  if (!savedUserTestData.rowCount)
    throw new DbError('failed to save the user data');
  return true;
}

export async function GetUserPersonalTestData() {
  const userGeneralTestData = await pgPool.query(getUserGeneralTestDataQuery, [
    'f415284b-87b4-4206-a79f-5bd61b00de97',
  ]);
  const userSubjectWiseTestData = await pgPool.query(
    getUserSubjectWiseTestDataQuery,
    ['f415284b-87b4-4206-a79f-5bd61b00de97'],
  );
  if (!userGeneralTestData.rowCount || !userSubjectWiseTestData.rowCount)
    throw new DbError('failed to get the personalized user data');
  return {
    general: userGeneralTestData.rows,
    subjectWise: userSubjectWiseTestData.rows,
  };
}

export async function PurchaseOneTimeSubscription() {
  const product = [{
    name: "Fish",
    quantity: 20,
    amount: 20000,
    id: 1,
    description: "fish is a animal"
  }, {
    name: "Dog",
    quantity: 20,
    amount: 50000,
    id: 2,
    description: "dog is not an animal"
  }]
  const list_items = product.map(item => ({
    quantity: item.quantity,
    price_data: {
      currency: "pkr",
      unit_amount: item.amount,
      product_data: {
        name: item.name,
        description: item.description,
      }
    }
  }))
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: list_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",

  })
  console.log(session)
  return session.id
}
