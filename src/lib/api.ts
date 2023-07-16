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
  private isRefreshing = false;
  private refreshSubscribers: ((accessToken: string) => void)[] = [];
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
        // set cookies in the request
        Cookie: this.context?.req?.headers.cookie ?? '',
      },
      withCredentials: true,
    });

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // get he access token from the cookies and add it to the request header
        if (this.context) {
          if (!this.context.req.cookies['refresh']) {
            return Promise.reject('No refresh token found');
          }
        }
        let access = '';
        if (typeof window !== 'undefined') {
          access = Cookies.get('access') ?? '';
        } else {
          access = this.context?.req.cookies['access'] ?? '';
        }

        if (access) {
          config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          !(
            error.config.url?.endsWith('/refresh/') ||
            error.config.url?.endsWith('/refresh')
          )
        ) {
          try {
            const access = await this.refreshTokens();
            // Retry the original request

            const axiosInstance = axios.create({
              baseURL: SERVER_URL,
              timeout: 180_000,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
              },
              withCredentials: true,
            });

            // Retry the original request using the new Axios instance
            return axiosInstance(error.config);
          } catch (refreshError) {
            // If refreshing fails, redirect to login
            logger(refreshError, 'Can not refresh token');
            return Promise.reject(refreshError);
          }
        }
        // If the error is not 401 or it was a refresh request, reject the promise
        return Promise.reject(error);
      }
    );
  }

  private async refreshTokens() {
    try {
      if (this.isRefreshing) {
        // If refresh tokens request is already in progress,
        // wait for it to complete and return the new access token
        return new Promise<string>((resolve) => {
          this.refreshSubscribers.push(resolve);
        });
      }

      this.isRefreshing = true;

      // check if there is refresh token in the cookies
      if (this.context) {
        if (!this.context.req.cookies['refresh']) {
          return Promise.reject('No refresh token found');
        }
      }
      // server side -> make direct request to server
      // This request includes the refresh token as a HttpOnly cookie
      const response = await this.post('/token/civuiaubcyvsdcibhsvus/refresh/');

      // If the response is successful, the new access token is automatically
      // included in the Set-Cookie header of the response, and axios will
      // automatically store it as a HttpOnly cookie because withCredentials
      // is true.

      const newAccessToken = response.data.access;

      // Notify all subscribers that the new access token is available
      this.refreshSubscribers.forEach((resolve) => resolve(newAccessToken));
      this.refreshSubscribers = [];

      this.isRefreshing = false;

      return newAccessToken;
    } catch (error) {
      // If the request fails, it means the refresh token is expired or invalid.
      // In this case, log the error and throw it so the response interceptor
      // can handle it.
      logger((error as AxiosError).cause, "Can't refresh token");
      throw error;
    }
  }

  public async login(user: { username: string; password: string }) {
    try {
      if (!user.username || !user.password)
        throw new Error('Foydalanuvchi nomi yoki paroli kiritilmadi');
      const res = await this.post('/token/', { ...user });
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
      await this.post('/logout/');
      this.redirectToLogin();
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

      const res = await this.post('/users/', { user: data });
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
      return response.data;
    } catch (error: any) {
      logger(error, 'Error getting current user');
      this.redirectToLogin();
      return null;
    }
  }

  private redirectToLogin() {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register'
      ) {
        window.location.replace('/login');
      }
    } else {
      if (
        this.context?.req.url !== '/login' &&
        this.context?.req.url !== '/register'
      )
        if (this.context?.res) {
          // clear the cookies
          this.context.res.setHeader('Set-Cookie', [
            `access_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; Domain=${
              process.env.NODE_ENV === 'production'
                ? '.uzanalitika.uz'
                : 'localhost'
            }`,
            `refresh_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; Domain=${
              process.env.NODE_ENV === 'production'
                ? '.uzanalitika.uz'
                : 'localhost'
            }`,
          ]);
          this.context.res.writeHead(302, { Location: '/login' }).end();
        }
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
        this.redirectToLogin();
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
        this.redirectToLogin();
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
