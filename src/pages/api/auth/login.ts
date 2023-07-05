import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import logger from '@/lib/logger';

import { SERVER_URL } from '@/constant/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { user } = body;

  if (!user) {
    return res.status(400).json({ detail: 'User data is required.' });
  }

  try {
    console.log('user', user);
    const response = await axios.post(SERVER_URL + '/token/', user, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const refreshToken = response.data.refresh;
      const accessToken = response.data.access;

      const isSecure = process.env.NODE_ENV === 'production';

      res.setHeader('Set-Cookie', [
        `access_token=${accessToken}; HttpOnly; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${15 * 60}; Domain=${
          // 1 minute
          process.env.NODE_ENV === 'production' ? '.alijonov.com' : 'localhost'
        }`,
        `refresh_token=${refreshToken}; HttpOnly; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${14 * 24 * 60 * 60}; Domain=${
          // 14 days
          process.env.NODE_ENV === 'production' ? '.alijonov.com' : 'localhost'
        }`,
      ]);

      return res.status(200).json({ access: accessToken });
    } else {
      return res.status(400).json({ detail: 'Error in setting cookies.' });
    }
  } catch (error) {
    // Log error
    logger(error, 'Error in /api/login');
    return res.status(500).json({ detail: 'Error in /api/login.', error });
  }
}
