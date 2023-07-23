export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const SERVER_URL = !isLocal
  ? 'http://localhost:8000/api'
  : 'https://api.alijonov.com/api';
