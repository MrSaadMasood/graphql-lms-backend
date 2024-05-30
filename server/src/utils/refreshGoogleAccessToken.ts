import { UserRefreshClient } from 'google-auth-library';
import env from '../zodSchema/envValidator';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;

export async function refreshGoogleAccessToken(refreshToken: string) {
  const userRefresh = new UserRefreshClient(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    refreshToken,
  );
  const { credentials } = await userRefresh.refreshAccessToken();
  return credentials;
}
