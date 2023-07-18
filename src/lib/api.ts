/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';

import logger from '@/lib/logger';

import { SERVER_URL } from '@/constant/env';

class API {
  public instance: AxiosInstance;
  private context: GetServerSidePropsContext | null = null;

  constructor(context: GetServerSidePropsContext | null = null) {
    const baseURL = SERVER_URL;
    if (!baseURL) {
      throw new Error('No SERVER_URL provided');
    }
    if (context) this.context = context;
    this.instance = axios.create({
      baseURL,
      timeout: 180_000, // sets the request timeout to  3 minutes
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Add a request interceptor
    this.instance.interceptors.request.use(
      async (config) => {
        // get the access token from the cookies and add it to the request header
        const access =
          this.context?.req.cookies['access'] ?? Cookies.get('access') ?? null;
        if (access) {
          config.headers.Authorization = `Bearer ${access}`;
        } else {
          try {
            const newAccess = await this.refreshTokens();
            config.headers.Authorization = `Bearer ${newAccess}`;
          } catch (err) {
            logger(err, 'Error in request interceptor');
            return Promise.reject(err);
          }
        }

        return config;
      },
      (error) => {
        logger(error, 'Error in request interceptor');
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const access = await this.refreshTokens();
            error.config.headers.Authorization = `Bearer ${access}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            logger(refreshError, 'Can not refresh token');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshTokens() {
    try {
      const isProd = process.env.NODE_ENV === 'production';
      const url = isProd ? '/api/refresh' : 'http://localhost:3000/api/refresh';

      const refreshToken = this.context?.req.cookies['refresh'] ?? null;
      const response = await axios.post(url, { refreshToken });

      const newAccessToken = response.data.access;

      if (this.context) {
        // set refresh token as it is not set in api route on server-side
        this.context.res.setHeader('Set-Cookie', [
          `access=${newAccessToken}; Path=/; SameSite=Lax; ${
            isProd ? 'Secure' : ''
          }; Max-Age=${1 * 60};`,
          `refresh=${response.data.refresh}; HttpOnly; Path=/; SameSite=Lax; ${
            isProd ? 'Secure' : ''
          }; Max-Age=${7 * 24 * 60 * 60};`,
        ]);
      }

      return newAccessToken;
    } catch (error) {
      logger(
        (error as AxiosError).response?.data ?? error,
        "Can't refresh token in refreshTokens"
      );
      throw new Error("Can't refresh token");
    }
  }

  public async login(user: { username: string; password: string }) {
    try {
      if (!user.username || !user.password)
        throw new Error('Foydalanuvchi nomi yoki paroli kiritilmadi');
      const res = await axios.post('/api/auth/login', { user });
      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (err) {
      logger(err, "Can't login");
      throw new Error('Xatolik yuz berdi');
    }
  }

  public async logout() {
    try {
      await axios.post('/api/auth/logout');
      return true;
    } catch (err) {
      logger(err, 'Xatolik yuz berdi');
    }
  }

  public async register(user: {
    username: string;
    email?: string;
    phone_number: string;
    referred_by?: string;
    fingerprint?: string;
    password: string;
  }) {
    try {
      const data = {
        username: user.username,
        email: user.email,
        phone_number: '+' + user.phone_number,
        referred_by_code: user.referred_by,
        fingerprint: user.fingerprint,
        password: user.password,
      };

      if (!data.username || !data.phone_number || !data.password)
        throw new Error(
          'Foydalanuvchi nomi, telefon raqami yoki paroli kiritilmadi'
        );

      const res = await axios.post('/api/auth/register', { user: data });
      if (res.status === 200) return true;
      return false;
    } catch (err) {
      logger(err, "Can't register");
      throw new Error('Xatolik yuz berdi');
    }
  }

  public async getCurrentUser() {
    try {
      const response = await this.get('/users/me/');

      if (!response || response.status !== 200) {
        return null;
      }

      return response.data;
    } catch (error: any) {
      logger(error, 'Error getting current user');
      return null;
    }
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      return this.instance.get<T, R>(url, config);
    } catch (err) {
      const error = err as AxiosError;
      if (
        error.message === 'No refresh token found' ||
        error.message === "Can't refresh token"
      ) {
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      return this.instance.post<T, R>(url, data, config);
    } catch (err) {
      const error = err as AxiosError;
      if (
        error.message === 'No refresh token found' ||
        error.message === "Can't refresh token"
      ) {
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete<T, R>(url, config);
  }
}

export default API;
