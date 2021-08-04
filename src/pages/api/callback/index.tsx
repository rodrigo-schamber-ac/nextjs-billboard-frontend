import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import axios from 'axios';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const stateKey = 'spotify_auth_state';

export default function callback(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  } else {
    const params = new URLSearchParams();

    params.append('code', `${code}`);
    params.append('redirect_uri', `${redirect_uri}`);
    params.append('grant_type', 'authorization_code');

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      }
    };

    axios
      .post('https://accounts.spotify.com/api/token', params, config)
      .then((response) => {
        if (response.status === 200) {
          const access_token = response?.data?.access_token;
          const refresh_token = response?.data?.refresh_token;
          const options = {
            headers: { Authorization: 'Bearer ' + access_token }
          };

          axios
            .get('https://api.spotify.com/v1/me', options)
            .then((response) => {
              console.log('access token: ', access_token);
              console.log('refresh token: ', refresh_token);
              res.redirect('home/' + response?.data?.id);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          res.redirect(
            '/#' +
              querystring.stringify({
                error: 'invalid_token'
              })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
