import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import logger from '@/lib/logger';

import { SERVER_URL } from '@/constant/env';

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const refreshToken = req.cookies['refresh'];

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

      res.setHeader('Set-Cookie', [
        `access=${newAccessToken}; Path=/; SameSite=None; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${14 * 60}; Domain=${
          // 15 minutes
          process.env.NODE_ENV === 'production'
            ? '.uzanalitika.uz'
            : 'localhost'
        }`,
        `refresh=${newRefreshToken}; HttpOnly; Path=/; SameSite=None; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${7 * 24 * 60 * 60}; Domain=${
          // 30 days
          process.env.NODE_ENV === 'production'
            ? '.uzanalitika.uz'
            : 'localhost'
        }`,
      ]);

      res.status(200).json({ access: newAccessToken });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger(error, "Can't refresh token");
      // res
      //   .status(error.response ? error.response.status : 500)
      //   .json({ error: 'Error refreshing token' });
      res.writeHead(302, {
        Location: '/',
      });
      res.end();
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Only POST requests are accepted' });
  }
};

export default refresh;
