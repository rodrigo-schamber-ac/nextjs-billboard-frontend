import { NextApiRequest, NextApiResponse } from 'next';
import { ApiMessage } from '../../../types';

export default function home(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const messageGet: ApiMessage = {
      error: false,
      message: `Logged in.`
    }
    res.status(200).json(messageGet);
  }
  if (req.method === 'POST') {
    const messagePost: ApiMessage = {
      error: true,
      message: '405 - Method not allowed.'
    };
    res.status(405).json(messagePost);
  }
};