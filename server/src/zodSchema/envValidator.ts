import dotenv from 'dotenv';
import { zodString } from './schema';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
  ACCESS_SECRET_USER: zodString,
  ACCESS_SECRET_ADMIN: zodString,
  REFRESH_SECRET_USER: zodString,
  REFRESH_SECRET_ADMIN: zodString,
  GOOGLE_CLIENT_ID: zodString,
  GOOGLE_CLIENT_SECRET: zodString,
});

const env = envSchema.parse(process.env);

export default env;
