import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import logger from '@/lib/logger';

import { SERVER_URL } from '@/constant/env';

import { UserType } from '@/types/user';

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token found' });
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}/token/civuiaubcyvsdcibhsvus/refresh/`,
        {
          refresh: refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const isSecure = process.env.NODE_ENV === 'production';
      const tokens = response.data;

      if (!tokens) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }

      const newAccessToken = tokens.access;
      const newRefreshToken = tokens.refresh;
      const user = tokens.user as UserType;

      res.setHeader('Set-Cookie', [
        `access_token=${newAccessToken}; HttpOnly; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${1 * 60}; Domain=${
          // 15 minutes
          process.env.NODE_ENV === 'production' ? '.alijonov.com' : 'localhost'
        }`,
        `refresh_token=${newRefreshToken}; HttpOnly; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${7 * 24 * 60 * 60}; Domain=${
          // 30 days
          process.env.NODE_ENV === 'production' ? '.alijonov.com' : 'localhost'
        }`,
      ]);

      res.status(200).json({ access: newAccessToken, user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger(error, "Can't refresh token");
      res
        .status(error.response ? error.response.status : 500)
        .json({ error: 'Error refreshing token' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Only POST requests are accepted' });
  }
};

export default refresh;
