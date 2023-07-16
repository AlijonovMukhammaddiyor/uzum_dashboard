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
      return res.status(200).json({});
    } else {
      return res.status(400).json({ detail: 'Error in setting cookies.' });
    }
  } catch (error) {
    // Log error
    logger(error, 'Error in /api/login');
    return res.status(500).json({ detail: 'Error in /api/login.', error });
  }
}
