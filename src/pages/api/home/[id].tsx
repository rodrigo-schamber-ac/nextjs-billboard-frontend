import { NextApiRequest, NextApiResponse } from 'next';

export default function home(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    res.status(200).json(req.query.id)
  }
  if (req.method === 'POST') {
    res.status(405).json({error: true, message: "405 - Method not allowed."});
  }
};