var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { DbError, InputValidationError } from '../../customErrors/errors.js';
import pgPool from '../../postgresClient/pgClient.js';
import { GENERAL_STATS, pubsub } from '../../pubSub/pubSub.js';
import { generalStatsQuery, getUserDataQuery, getUserGeneralTestDataQuery, getUserSubjectWiseTestDataQuery, saveUserTestDataQuery, testBasedOnPaperYearQuery, testBasedOnRandomOption, testBasedOnSubjectQuery, } from '../../sqlQueries/reusedSQLQueries.js';
import { stripe } from '../../stripe/stripe.js';
import { intParser, requestUserExistenceVerifier } from '../../utils/helperFunctions.js';
export function GetUserData(_root, _args, context) {
  return __awaiter(this, void 0, void 0, function* () {
    const user = requestUserExistenceVerifier(context.user);
    const [userData, generalStats] = yield Promise.all([
      pgPool.query(getUserDataQuery, [user.email]),
      pgPool.query(generalStatsQuery)
    ]);
    if (!userData.rowCount || !generalStats.rowCount)
      throw new DbError('failed to get the user Data');
    const stats = generalStats.rows[0];
    pubsub.publish(GENERAL_STATS, {
      generalStats: {
        totalBank: intParser(stats.totalbank),
        totalUsers: intParser(stats.totalusers),
        totalAttempted: intParser(stats.totalattempted)
      }
    });
    return userData.rows[0];
  });
}
export function GetTestBasedOnOptions(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { input }, context) {
    const { paperCategory, paperYear, paperSubject, giveRandomTest, academyName, limit, } = input;
    if (paperYear) {
      requestUserExistenceVerifier(context.user);
      const specificYearPaper = yield pgPool.query(testBasedOnPaperYearQuery, [paperYear, paperCategory, academyName]);
      if (!specificYearPaper.rowCount)
        throw new DbError('failed to get the specific year test');
      return specificYearPaper.rows;
    }
    if (paperSubject) {
      const specificSubjectMCQ = yield pgPool.query(testBasedOnSubjectQuery, [paperCategory, academyName, paperSubject]);
      if (!specificSubjectMCQ.rowCount)
        throw new DbError('failed to get the specific year test');
      return specificSubjectMCQ.rows;
    }
    if (giveRandomTest) {
      const controlledLimit = limit || 20;
      const randomMCQ = yield pgPool.query(testBasedOnRandomOption, [paperCategory, academyName, controlledLimit]);
      if (!randomMCQ.rowCount)
        throw new DbError('failed to get the random tests');
      return randomMCQ.rows;
    }
    throw new InputValidationError('inputs provided are incorrect');
  });
}
export function SaveUserTestData(_parent_1, _a, context_1) {
  return __awaiter(this, arguments, void 0, function* (_parent, { input: { totalSolved, totalWrong, totalCorrect, subject }, }, context) {
    const user = requestUserExistenceVerifier(context.user);
    const [savedUserTestData, generalStats] = yield Promise.all([pgPool.query(saveUserTestDataQuery, [
      user.id,
      subject,
      totalSolved,
      totalCorrect,
      totalWrong,
    ]),
    pgPool.query(generalStatsQuery)
    ]);
    if (!savedUserTestData.rowCount || !generalStats)
      throw new DbError('failed to save the user data');
    const stats = generalStats.rows[0];
    pubsub.publish(GENERAL_STATS, {
      generalStats: {
        totalBank: intParser(stats.totalbank),
        totalUsers: intParser(stats.totalusers),
        totalAttempted: intParser(stats.totalattempted)
      }
    });
    return true;
  });
}
export function GetUserPersonalTestData(_parent, _args, context) {
  return __awaiter(this, void 0, void 0, function* () {
    const user = requestUserExistenceVerifier(context.user);
    const userGeneralTestData = yield pgPool.query(getUserGeneralTestDataQuery, [
      user.id,
    ]);
    const userSubjectWiseTestData = yield pgPool.query(getUserSubjectWiseTestDataQuery, [user.id]);
    if (!userGeneralTestData.rowCount || !userSubjectWiseTestData.rowCount)
      throw new DbError('failed to get the personalized user data');
    return {
      general: userGeneralTestData.rows,
      subjectWise: userSubjectWiseTestData.rows,
    };
  });
}
export function PurchaseOneTimeSubscription(_parent, _args, context) {
  return __awaiter(this, void 0, void 0, function* () {
    requestUserExistenceVerifier(context.user);
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
    }];
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
    }));
    const session = yield stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: list_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    return session.id;
  });
}
