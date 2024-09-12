var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { AuthorizationError } from '../customErrors/errors.js';
import pgPool from '../postgresClient/pgClient.js';
import env from '../zodSchema/envValidator.js';
import oAuth2Client from './oAuth2Client.js';
const { ACCESS_SECRET_USER, ACCESS_SECRET_ADMIN } = env;
export function dateValidator(value) {
  return z.date({ invalid_type_error: 'expected date string' }).parse(value);
}
export function stringValidator(value) {
  if (typeof value === 'string' && value.length > 0)
    return value;
  throw new TypeError('Empty string is recieved');
}
export function emailValidator(value) {
  return z.string().email().parse(value);
}
export function context(_a) {
  return __awaiter(this, arguments, void 0, function* ({ req }) {
    var _b;
    try {
      const login_method = req.headers["x-custom-loginMethod"];
      const role = req.headers["x-custom-role"];
      const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
      if (!token)
        return null;
      if (login_method === "google") {
        const googleUserPayload = yield oAuth2Client.getTokenInfo(token);
        const user = yield pgPool.query(`select * from users where email = $1`, [googleUserPayload.email]);
        if (!user.rowCount)
          return null;
        return user.rows[0];
      }
      const tokenPayload = jwt.verify(token, role === 'admin' ? ACCESS_SECRET_ADMIN : ACCESS_SECRET_USER);
      if (!tokenPayload.id)
        return null;
      const user = yield pgPool.query(`select * from users where id = $1`, [tokenPayload.id]);
      if (!user.rowCount)
        return null;
      return { user: user.rows[0] };
    }
    catch (error) {
      console.log("error occured while getting user context", error);
      return null;
    }
  });
}
export function authenticateAdmin(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a;
    try {
      const login_method = req.headers["x-custom-loginMethod"];
      const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
      if (!token)
        throw new Error;
      if (login_method === "google") {
        const googleUserPayload = yield oAuth2Client.getTokenInfo(token);
        const user = yield pgPool.query(`select * from users where email = $1`, [googleUserPayload.email]);
        if (!user.rowCount || user.rows[0].role !== "admin")
          throw new Error;
        req.user = user.rows[0];
        return next();
      }
      const tokenPayload = jwt.verify(token, ACCESS_SECRET_ADMIN);
      if (!tokenPayload.id)
        throw new Error;
      const user = yield pgPool.query(`select * from users where id = $1`, [tokenPayload.id]);
      if (!user.rowCount || user.rows[0].role !== "admin")
        throw new Error;
      req.user = user.rows[0];
      return next();
    }
    catch (error) {
      console.log("error occured while authenticaing if the user is admin", error);
      res.status(401).json("failed to authenticate");
    }
  });
}
export function requestUserExistenceVerifier(user, checkAdmin) {
  if (!user)
    throw new AuthorizationError("user authentication error");
  if (checkAdmin && user.role !== "admin")
    throw new AuthorizationError("only admins can access this endpoint");
  return user;
}
export function intParser(value) {
  if (!value)
    return 0;
  return parseInt(value);
}
