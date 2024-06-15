import { OAuth2Client } from 'google-auth-library';
import env from '../zodSchema/envValidator.js';
const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = env;

const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage',
);

export default oAuth2Client;
