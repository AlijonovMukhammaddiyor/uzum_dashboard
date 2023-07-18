import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

import { SERVER_URL } from '@/constant/env';

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let refresh = req.body.refreshToken ?? null;

    if (!refresh) {
      const cookies = nookies.get({ req });
      console.log('headers', req.headers);
      refresh = cookies.refresh ?? null;
    }

    // if (!refresh) {
    //   return res.status(401).json({ error: 'No refresh token found' });
    // }

    try {
      const response = await axios.post(
        `${SERVER_URL}/token/civuiaubcyvsdcibhsvus/refresh/`,
        { refresh },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const isSecure = process.env.NODE_ENV === 'production';
      const tokens = response.data;

      console.log('tokens from server', tokens, response.status);
      if (!tokens) {
        return res.status(401).json({ error: 'No refresh token found' });
      }

      res.setHeader('Set-Cookie', [
        `access=${tokens.access}; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${14 * 60};`,
        `refresh=${tokens.refresh}; HttpOnly; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=${7 * 24 * 60 * 60};`,
      ]);

      res.status(200).json({ access: tokens.access, refresh: tokens.refresh });
    } catch (error: any) {
      // logger(error, "Can't refresh token in /api/refresh");
      res
        .status(error.response ? error.response.status : 500)
        .json({ error: 'Error refreshing token in api/refresh 2' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Only POST requests are accepted' });
  }
};

export default refresh;
