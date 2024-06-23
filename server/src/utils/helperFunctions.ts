import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { UserContext, UserInfoToCreateToken, UserLoginMethod, UserRole } from '../__generated__/types';
import { AuthorizationError } from '../customErrors/errors';
import pgPool from '../postgresClient/pgClient';
import env from '../zodSchema/envValidator';
import oAuth2Client from './oAuth2Client';
import { CustomRequest } from '../__generated__/customRequest';

const { ACCESS_SECRET_USER, ACCESS_SECRET_ADMIN } = env

export function dateValidator(value: unknown) {
  return z.date({ invalid_type_error: 'expected date string' }).parse(value);
}

export function stringValidator(value: unknown) {
  if (typeof value === 'string' && value.length > 0) return value;
  throw new TypeError('Empty string is recieved');
}

export function emailValidator(value: unknown) {
  return z.string().email().parse(value)
}

export async function context({ req }: { req: Request }) {
  try {
    const login_method = req.headers["x-custom-loginMethod"] as UserLoginMethod
    const role = req.headers["x-custom-role"] as UserRole
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return null
    if (login_method === "google") {
      const googleUserPayload = await oAuth2Client.getTokenInfo(token)
      const user = await pgPool.query(`select * from users where email = $1`,
        [googleUserPayload.email])
      if (!user.rowCount) return null
      return user.rows[0]
    }
    const tokenPayload = jwt.verify(token, role === 'admin' ? ACCESS_SECRET_ADMIN : ACCESS_SECRET_USER) as {
      role: UserRole,
      id: string
    }
    if (!tokenPayload.id) return null
    const user = await pgPool.query<UserInfoToCreateToken>(`select * from users where id = $1`, [tokenPayload.id])
    if (!user.rowCount) return null
    return { user: user.rows[0] }
  } catch (error) {
    console.log("error occured while getting user context", error)
    return null
  }

}

export async function authenticateAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const login_method = req.headers["x-custom-loginMethod"] as UserLoginMethod
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) throw new Error
    if (login_method === "google") {
      const googleUserPayload = await oAuth2Client.getTokenInfo(token)
      const user = await pgPool.query<UserInfoToCreateToken>(`select * from users where email = $1`,
        [googleUserPayload.email])
      if (!user.rowCount || user.rows[0].role !== "admin") throw new Error
      req.user = user.rows[0]
      return next()
    }
    const tokenPayload = jwt.verify(token, ACCESS_SECRET_ADMIN) as {
      role: "admin",
      id: string
    }
    if (!tokenPayload.id) throw new Error
    const user = await pgPool.query<UserInfoToCreateToken>(`select * from users where id = $1`, [tokenPayload.id])
    if (!user.rowCount || user.rows[0].role !== "admin") throw new Error
    req.user = user.rows[0]
    return next()
  } catch (error) {
    console.log("error occured while authenticaing if the user is admin", error)
    res.status(401).json("failed to authenticate")
  }


}
export function requestUserExistenceVerifier(user: UserContext, checkAdmin?: boolean) {
  if (!user) throw new AuthorizationError("user authentication error")
  if (checkAdmin && user.role !== "admin") throw new AuthorizationError("only admins can access this endpoint")
  return user
}
