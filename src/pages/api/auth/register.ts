import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

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
    const response = await axios.post(
      SERVER_URL + '/users/',
      {
        ...user,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (response.status === 200 || response.status === 201) {
      const refreshToken = response.data.refresh;
      const accessToken = response.data.access;

      const isSecure = process.env.NODE_ENV === 'production';

      setCookie({ res }, 'access', accessToken, {
        path: '/',
        sameSite: 'lax',
        secure: isSecure,
        maxAge: 14 * 60,
      });

      setCookie({ res }, 'refresh', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: isSecure,
        maxAge: 7 * 24 * 60 * 60,
      });

      return res.status(200).json({ detail: 'Success' });
    } else {
      return res.status(400).json({ detail: 'Error in setting cookies.' });
    }
  } catch (error) {
    // Log error
    logger(error, 'Error in /api/auth/register');
    return res.status(500).json({ detail: 'Error in /api/register.' });
  }
}
