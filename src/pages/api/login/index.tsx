import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../../utils/cookies';
import querystring from 'querystring';

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

const generateRandomString = function (length: number): string {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const stateKey = 'spotify_auth_state';

export default function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';
  setCookie(res, stateKey, state);
  
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
};