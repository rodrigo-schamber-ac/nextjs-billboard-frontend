import { NextApiRequest, NextApiResponse } from 'next';

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const { slug } = req.query as { slug: string };
  res.status(200).json({ message: `Hello World! The slug is ${slug}.` });
}
