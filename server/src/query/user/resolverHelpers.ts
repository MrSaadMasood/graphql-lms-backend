import {
  GetTestOptions,
  TestDataSent,
  UserTestDataInput,
} from '../../__generated__/graphql';
import { GeneralStats, UserContext } from '../../__generated__/types';
import { DbError, InputValidationError } from '../../customErrors/errors';
import pgPool from '../../postgresClient/pgClient';
import { GENERAL_STATS, pubsub } from '../../pubSub/pubSub';
import {
  generalStatsQuery,
  getUserDataQuery,
  getUserGeneralTestDataQuery,
  getUserSubjectWiseTestDataQuery,
  saveUserTestDataQuery,
  testBasedOnPaperYearQuery,
  testBasedOnRandomOption,
  testBasedOnSubjectQuery,
} from '../../sqlQueries/reusedSQLQueries';
import { stripe } from '../../stripe/stripe';
import { intParser, requestUserExistenceVerifier } from '../../utils/helperFunctions';

export async function GetUserData(
  _root: unknown,
  _args: unknown,
  context: { user: UserContext }
) {
  const user = requestUserExistenceVerifier(context.user)
  const [userData, generalStats] = await Promise.all([
    pgPool.query(getUserDataQuery, [user.email]),
    pgPool.query<GeneralStats>(generalStatsQuery)
  ])
  if (!userData.rowCount || !generalStats.rowCount) throw new DbError('failed to get the user Data');
  const stats = generalStats.rows[0]
  pubsub.publish(GENERAL_STATS, {
    generalStats: {
      totalBank: intParser(stats.totalbank),
      totalUsers: intParser(stats.totalusers),
      totalAttempted: intParser(stats.totalattempted)
    }
  })
  return userData.rows[0];
}

export async function GetTestBasedOnOptions(
  _parent: unknown,
  { input }: { input: GetTestOptions },
  context: { user: UserContext }
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
    requestUserExistenceVerifier(context.user)
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
  context: { user: UserContext }
) {
  const user = requestUserExistenceVerifier(context.user)
  const [savedUserTestData, generalStats] = await Promise.all([pgPool.query(saveUserTestDataQuery, [
    user.id,
    subject,
    totalSolved,
    totalCorrect,
    totalWrong,
  ]),
  pgPool.query<GeneralStats>(generalStatsQuery)
  ])
  if (!savedUserTestData.rowCount || !generalStats)
    throw new DbError('failed to save the user data');
  const stats = generalStats.rows[0]
  pubsub.publish(GENERAL_STATS, {
    generalStats: {
      totalBank: intParser(stats.totalbank),
      totalUsers: intParser(stats.totalusers),
      totalAttempted: intParser(stats.totalattempted)
    }
  })
  return true;
}

export async function GetUserPersonalTestData(
  _parent: unknown,
  _args: unknown,
  context: { user: UserContext }
) {
  const user = requestUserExistenceVerifier(context.user)
  const userGeneralTestData = await pgPool.query(getUserGeneralTestDataQuery, [
    user.id,
  ]);
  const userSubjectWiseTestData = await pgPool.query(
    getUserSubjectWiseTestDataQuery,
    [user.id],
  );
  if (!userGeneralTestData.rowCount || !userSubjectWiseTestData.rowCount)
    throw new DbError('failed to get the personalized user data');
  return {
    general: userGeneralTestData.rows,
    subjectWise: userSubjectWiseTestData.rows,
  };
}

export async function PurchaseOneTimeSubscription(
  _parent: unknown,
  _args: unknown,
  context: { user: UserContext }
) {
  requestUserExistenceVerifier(context.user)
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
  return session.id
}
