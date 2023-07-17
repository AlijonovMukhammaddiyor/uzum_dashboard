import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const access = req.cookies['access'] ?? '';
    if (!access) {
      return res.status(401).json({ error: 'No access token found' });
    }

    const isExpired =
      (jwtDecode(access) as { exp: number })?.exp < Date.now() / 1000;

    if (access && !isExpired) {
      return res.status(200).json({ access });
    } else {
      return res
        .status(401)
        .json({ error: 'Access token expired or not available' });
    }
  } catch (error) {
    logger(error, 'Error in /api/login');
    return res.status(500).json({ detail: 'Error in /api/login.', error });
  }
}
