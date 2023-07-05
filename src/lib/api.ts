/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import logger from '@/lib/logger';

import { SERVER_URL } from '@/constant/env';

class API {
  public instance: AxiosInstance;
  private context: GetServerSidePropsContext | null;
  private refreshTokenAge: number = 14 * 24 * 60 * 60; // 14 days
  private accessTokenAge: number = 15 * 60; // 15 minutes
  private proxy = '/api/external';
  private isApi = false;

  constructor(context: GetServerSidePropsContext | null = null, isApi = false) {
    const baseURL = SERVER_URL;
    if (!baseURL) {
      throw new Error('No SERVER_URL provided');
    }
    this.isApi = isApi;
    this.context = context;
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
        const token = this.getAccessToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        } else {
          if (this.context) {
            // check if there is a refresh token. If not, redirect to login
            const access = await this.refreshTokens();
            if (access) {
              config.headers['Authorization'] = `Bearer ${access}`;
            } else {
              // no access token means user is not logged in
              // so we redirect to login page if not already there
              logger('No access token', 'Can not refresh token 1');
              this.redirectToLogin();
              // we can reject the request here as it won't be authorized anyway
              return Promise.reject(new Error('Not logged in'));
            }
          }
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
            const config = error.config;
            // log old authorization header
            // const token = this.getAccessToken();
            if (access) {
              config.headers['Authorization'] = `Bearer ${access}`;
            } else {
              // no access token means user is not logged in
              // so we redirect to login page if not already there
              logger('No access token', 'Can not refresh token 2');
              this.redirectToLogin();

              // we can reject the request here as it won't be authorized anyway
              return Promise.reject(new Error('Not logged in'));
            }
            console.log(
              error.config.url,
              'rrrrresending request with new token',
              access,
              ' \naccess '
            );
            // console.log('resending request with new token');
            console.log('config', config);
            return this.instance(config);
          } catch (refreshError) {
            // If refreshing fails, redirect to login
            logger(refreshError, 'Can not refresh token 3');
            this.redirectToLogin();
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
      if (this.context) {
        console.log('Inside refresh token');
        // server side -> make direct request to server
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
          // if not refresh token, redirect to login
          throw new Error('getRefreshToken did not return a token');
        }
        // console.log('Refresh ', refreshToken);
        const tokens = await this._refreshTokens(refreshToken);
        console.log('Tokens ', tokens);
        if (!tokens) {
          // if no tokens, redirect to login
          throw new Error('No tokens returned from _refreshTokens');
        }
        // set the new tokens

        this.setTokens(tokens.accessToken, tokens.refreshToken);

        return tokens.accessToken;
      } else {
        logger('No context', 'Can not refresh token');
      }
    } catch (error: any) {
      logger(error.message, "Can't refresh token");
      throw new Error("Can't refresh token");
    }
  }

  private async _refreshTokens(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
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
      const newAccessToken = response.data.access;
      const newRefreshToken = response.data.refresh;
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
      logger(error.response.data, "Can't refresh token");
      return null;
    }
  }

  private getAccessToken() {
    let token = '';
    // On the server, use the context to read cookies, on the client use js-cookie
    if (this.context) {
      const cookie = this.context.req.cookies.access_token;
      if (cookie) {
        token = cookie;
      }
    }
    return token;
  }

  private clearCookies() {
    if (this.context) {
      const isSecure = process.env.NODE_ENV === 'production';
      this.context.res.setHeader('Set-Cookie', [
        `access_token=; HttpOnly; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=0`,
        `refresh_token=; HttpOnly; Path=/; SameSite=Lax; ${
          isSecure ? 'Secure' : ''
        }; Max-Age=0`,
      ]);
    }
  }

  public async login(user: { username: string; password: string }) {
    try {
      if (!user.username || !user.password)
        throw new Error('Foydalanuvchi nomi yoki paroli kiritilmadi');
      const res = await axios.post('/api/auth/login/', { user });
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
      await axios.post('/api/auth/logout/');
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

      const res = await axios.post('/api/register/', { user: data });
      if (res.status === 200) return true;
      return false;
    } catch (err) {
      logger(err, "Can't register");
      throw new Error('Xatolik yuz berdi');
    }
  }

  private getRefreshToken() {
    // this is only used on the server side
    if (this.context) {
      // console.log(this.context.req.cookies);
      const cookie = this.context.req.cookies.refresh_token;
      if (cookie) {
        return cookie;
      }
    }
    throw new Error('No refresh token');
  }
  // JUst note: booth.ai
  private setTokens(access: string, refresh: string) {
    // only used on the server side
    const isSecure = process.env.NODE_ENV === 'production';
    if (this.isApi) {
      // set using res
      const isSecure = process.env.NODE_ENV === 'production';
      if (this.context?.res) {
        this.context.res.setHeader('Set-Cookie', [
          `access_token=${access}; HttpOnly; Path=/; SameSite=Lax; ${
            isSecure ? 'Secure' : ''
          }; Max-Age=${this.accessTokenAge}; Domain=${
            // 15 minutes
            process.env.NODE_ENV === 'production'
              ? '.alijonov.com'
              : 'localhost'
          }`,
          `refresh_token=${refresh}; HttpOnly; Path=/; SameSite=Lax; ${
            isSecure ? 'Secure' : ''
          }; Max-Age=${this.refreshTokenAge}; Domain=${
            // 14 days
            process.env.NODE_ENV === 'production'
              ? '.alijonov.com'
              : 'localhost'
          }`,
        ]);
      } else {
        logger('No res in context');
      }
    } else {
      nookies.set(this.context, 'access_token', access, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: isSecure,
        maxAge: this.accessTokenAge,
        domain:
          process.env.NODE_ENV === 'production' ? '.alijonov.com' : 'localhost',
      });

      nookies.set(this.context, 'refresh_token', refresh, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: isSecure,
        maxAge: this.refreshTokenAge,
        domain:
          process.env.NODE_ENV === 'production' ? '.alijonov.com' : 'localhost',
      });
    }
  }

  public async getCurrentUser() {
    try {
      const response = await this.get('/users/me/');
      return response.data;
    } catch (error: any) {
      logger(error, 'Error getting current user');
      return null;
    }
  }

  private redirectToLogin() {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register'
      ) {
        this.clearCookies();
        window.location.href = '/login';
      }
    } else if (this.context) {
      if (
        this.context.req.url !== '/login' &&
        this.context.req.url !== '/register'
      )
        if (this.context.res) {
          this.clearCookies();
          this.context.res.writeHead(302, { Location: '/login' }).end();
        }
    }
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    if (typeof window !== 'undefined') {
      url = `${this.proxy}${url}`;
      return axios.get<T, R>(url, config);
    }
    return this.instance.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    if (typeof window !== 'undefined') {
      url = `${this.proxy}${url}`;
      return axios.post<T, R>(url, data, config);
    }
    return this.instance.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      url = `${this.proxy}${url}`;
      return axios.put<T, R>(url, data, config);
    }

    return this.instance.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    if (typeof window !== 'undefined') {
      url = `${this.proxy}${url}`;
      return axios.patch<T, R>(url, data, config);
    }

    return this.instance.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    if (typeof window !== 'undefined') {
      url = `${this.proxy}${url}`;
      return axios.delete<T, R>(url, config);
    }

    return this.instance.delete<T, R>(url, config);
  }
}

export default API;
