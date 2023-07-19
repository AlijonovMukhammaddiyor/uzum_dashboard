import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUrl = req.query.url as string;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Url is required' });
  }

  try {
    // Fetch image from external source
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        // Insert necessary headers here
        Origin: 'https://uzum.uz',
        Referrer: 'https://uzum.uz/',
      },
    });

    const buffer = Buffer.from(response.data, 'binary');

    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Length', response.headers['content-length']);

    res.end(buffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching image' });
  }
}
