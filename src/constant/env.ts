export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const SERVER_URL = isLocal
  ? 'http://localhost:8000/api'
  : 'https://api.alijonov.com/api';

export const GOOGLE_CLIENT_ID =
  '483214873501-l2uhke5s95fejuciimdhcp8kt712lnj9.apps.googleusercontent.com';
