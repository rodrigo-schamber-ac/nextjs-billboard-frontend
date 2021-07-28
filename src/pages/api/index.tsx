import { NextApiRequest, NextApiResponse } from 'next';

export default function api(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  res.redirect("/api/login");
}