import { NextApiRequest, NextApiResponse } from 'next';

export default function home(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  res.status(200).json({ message: `Hello World!` });
};