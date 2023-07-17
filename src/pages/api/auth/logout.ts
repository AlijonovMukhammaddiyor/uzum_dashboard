// api/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';

import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    // remove refreshToken and accessToken cookies
    const isSecure = process.env.NODE_ENV === 'production';

    res.setHeader('Set-Cookie', [
      `access=; Path=/; SameSite=Lax; ${isSecure ? 'Secure' : ''}; Max-Age=0`,
      `refresh=; HttpOnly; Path=/; SameSite=Lax; ${
        isSecure ? 'Secure' : ''
      }; Max-Age=0`,
    ]);

    return res.status(200).json({ detail: 'Success' });
  } catch (error) {
    // Log error
    logger(error, 'Error in /api/logout');
    return res.status(500).json({ detail: 'Error in /api/logout.' });
  }
}
