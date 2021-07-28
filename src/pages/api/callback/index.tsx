import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import request from 'request';

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

    //Cookies.remove(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    };
    request.post(authOptions, (error, response, body): void => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body): void => {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          'home/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        );
      }
    });
  }
};