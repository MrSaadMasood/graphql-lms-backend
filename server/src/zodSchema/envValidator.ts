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
  STRIPE_SECRET_KEY: zodString,
  STRIPE_PUBLISHED_KEY: zodString,
  POSTGRES_USER: zodString.optional(),
  POSTGRES_PASSWORD: zodString.optional(),
  POSTGRES_DATABASE: zodString.optional(),
  POSTGRES_PORT: z.coerce.number().optional(),
  POSTGRES_HOST: zodString.optional(),
  PORT: z.coerce.number()
});

const env = envSchema.parse(process.env);

export default env;
