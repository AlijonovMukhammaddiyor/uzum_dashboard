import { AxiosError } from 'axios';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import API from '@/lib/api';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, headers } = req;
  const api = new API(
    {
      req,
      res,
    } as unknown as GetServerSidePropsContext,
    true
  );

  const { slug, ...otherQueries } = req.query;
  const params = new URLSearchParams(otherQueries as Record<string, string>);
  const endpoint = slug instanceof Array ? slug.join('/') : slug;
  let urlString = '/' + endpoint + '/';
  if (otherQueries) {
    urlString += '?' + params.toString();
  }

  try {
    console.log('urlString', urlString);
    const response = await api.instance({
      method,
      url: urlString,
      data: body,
      headers: {
        ...headers,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log('error', error, 'Error in api/external/[...slug].ts');
    logger(error, 'Error in api/external/[...slug].ts');
    const { response } = error as AxiosError;
    res.status(response?.status || 500).json(response?.data);
  }
}
