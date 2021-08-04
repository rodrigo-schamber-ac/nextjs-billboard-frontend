import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export default function handleRefreshToken(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const refresh_token = req.query.refresh_token;
  const params = new URLSearchParams();

  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', `${refresh_token}`);

  const config = {
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    }
  };

  axios
    .post('https://accounts.spotify.com/api/token', params, config)
    .then((response) => {
      if (response.status === 200) {
        const access_token = response?.data?.acess_token;
        res.send({ access_token: access_token });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
