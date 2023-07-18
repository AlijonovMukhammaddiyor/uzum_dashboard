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
    const response = await axios.post(SERVER_URL + '/token/', user, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      // set tokens to cookies  and redirect to /home
      const isSecure = process.env.NODE_ENV === 'production';
      const tokens = response.data;

      setCookie({ res }, 'access', tokens.access, {
        path: '/',
        sameSite: 'lax',
        secure: isSecure,
        maxAge: 14 * 60,
      });

      setCookie({ res }, 'refresh', tokens.refresh, {
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
    logger(error, 'Error in /api/login');
    return res.status(500).json({ detail: 'Error in /api/login.', error });
  }
}
