import { NextApiRequest, NextApiResponse } from 'next';

export default function handleApi(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  res.redirect("/api/login");
}