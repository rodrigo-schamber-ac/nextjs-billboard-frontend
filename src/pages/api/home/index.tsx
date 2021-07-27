import { NextApiRequest, NextApiResponse } from 'next';

export default function handleHome(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  res.status(200).json({ message: `Hello World!` });
}
