import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next/types';

import logger from '@/lib/logger';

import { SERVER_URL } from '@/constant/env';

export class API {
  // here, declare all endpoints of server
  static CURRENT_USER = '/api/users/me';
  static PHONE_CODE_SEND = '/code/';
  static PHONE_CODE_VERIFY = '/verify/';
  static USER_CREATE = '/users/';
  static TOP_PRODUCTS = '/product/top';
  static TOP_SHOPS = '/shop/top';
  static USER_LOGIN = '/token/';
  static USER_REFRESH_TOKEN = '/token/refresh/';
  static USER_LOGOUT = '/logout/';
  static USERNAME_NUMBER_CHECK = '/username_phone_match/';
  static USER_AUTH_CHECK = '/auth';
  static NEWPASSWORD = '/newpassword/';

  static getClientAPI() {
    // Create Axios instance
    const clientApi = axios.create({
      baseURL: SERVER_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': Cookies.get('csrftoken'),
      },
    });

    clientApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (
          error.response?.status === 401 &&
          originalRequest.url === '/api/token/refresh/'
        ) {
          if (!window.location.href.includes('/login'))
            window.location.href = '/login';
          return Promise.reject(error);
        }

        if (
          error?.response?.data?.code === 'token_not_valid' &&
          error?.response?.status === 401 &&
          error?.response?.statusText === 'Unauthorized'
        ) {
          const refreshToken = Cookies.get('refresh_token');

          if (refreshToken) {
            const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

            // Check if token is expired
            const now = Math.ceil(Date.now() / 1000);
            if (tokenParts.exp > now) {
              return clientApi
                .post('/api/token/refresh/', { refresh: refreshToken })
                .then((response) => {
                  Cookies.set('access_token', response.data.access);
                  Cookies.set('refresh_token', response.data.refresh);

                  clientApi.defaults.headers['Authorization'] =
                    'Bearer ' + response.data.access;
                  originalRequest.headers['Authorization'] =
                    'Bearer ' + response.data.access;

                  return clientApi(originalRequest);
                })
                .catch((_) => {
                  window.localStorage.clear();
                  if (!window.location.href.includes('/login'))
                    window.location.href = '/login/';
                });
            } else {
              window.localStorage.clear();
              if (!window.location.href.includes('/login'))
                window.location.href = '/login/';
            }
          } else {
            window.localStorage.clear();
            if (!window.location.href.includes('/login'))
              window.location.href = '/login/';
          }
        }

        // Handle specific error codes/messages here
        window.localStorage.clear();
        if (!window.location.href.includes('/login'))
          window.location.href = '/login/';
        return Promise.reject(error);
      }
    );

    return clientApi;
  }

  static createServerApi(context: GetServerSidePropsContext) {
    axios.defaults.baseURL = SERVER_URL;
    if (context.req.cookies['csrftoken'])
      axios.defaults.headers['X-CSRFTOKEN'] = context.req.cookies['csrftoken'];
    // forwards cookies in header
    if (context.req.headers.cookie)
      axios.defaults.headers.cookie = context.req.headers.cookie;

    if (context.req.headers.authorization) {
      axios.defaults.headers.authorization = context.req.headers.authorization;
    }
    // set access token in Authorization header
    const accessToken = context.req.cookies['access_token'];
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    const serverApi = axios.create();

    serverApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log('error', error.response);
        console.log("Can't refresh token 0");

        // Prevent infinite loops
        if (
          error.response.status === 401 &&
          originalRequest.url === '/api/token/refresh/'
        ) {
          console.log("Can't refresh token 1");
          return Promise.reject(error);
        }

        if (
          error.response.data.code === 'token_not_valid' &&
          error.response.status === 401 &&
          error.response.statusText === 'Unauthorized'
        ) {
          try {
            if (!context.req.cookies['refresh_token'])
              return Promise.reject("Can't refresh token 2");
            const newAccessToken = await API.refreshAccessToken(
              context.req.cookies['refresh_token']
            );
            axios.defaults.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            console.log('newAccessToken', newAccessToken);
            return serverApi(originalRequest);
          } catch (error) {
            logger(error, "Can't decode refresh token");
            return Promise.reject(error);
          }
        }

        // Handle specific error codes/messages here

        console.log('error', error.response.data);
        console.log();

        return Promise.reject(error);
      }
    );

    return serverApi;
  }

  static async refreshAccessToken(refreshToken: string) {
    try {
      const res = await axios.post(`${SERVER_URL}${API.USER_REFRESH_TOKEN}`, {
        refresh: refreshToken,
      });
      return res.data.access;
    } catch (error) {
      logger(error, "Can't refresh token");
      throw error;
    }
  }

  static async callServerClientSide(
    endpoint: string,
    data: { [key: string]: string | number | boolean | null | undefined },
    onResponse: (res: AxiosResponse) => void,
    onError: (err: AxiosError) => void,
    beforeRequest: () => void,
    afterRequest: () => void,
    method = 'get'
  ) {
    // beforeRequest();
    axios.defaults.withCredentials = true;
    let clientApi: AxiosInstance;
    if (
      endpoint === API.PHONE_CODE_SEND ||
      endpoint === API.PHONE_CODE_VERIFY ||
      endpoint === API.USER_CREATE ||
      endpoint === API.TOP_PRODUCTS ||
      endpoint === API.TOP_SHOPS ||
      endpoint === API.USERNAME_NUMBER_CHECK
    ) {
      clientApi = axios.create({
        baseURL: SERVER_URL,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else clientApi = this.getClientAPI();

    try {
      if (method.toLowerCase() === 'post') {
        clientApi
          .request({
            url: endpoint,
            method: method,
            data: data,
          })
          .then((res) => {
            // console.log('got response');
          })
          .catch((err) => {
            // console.log('got error');
            onError(err);
          });
      } else if (method.toLowerCase() === 'get') {
        // console.log('sending request 2');
        clientApi
          .request({
            url: endpoint,
            method: method,
            params: data,
          })
          .then((res) => {
            onResponse(res);
          })
          .catch((err) => {
            onError(err);
          });
      }
    } catch (err) {
      alert(err);
      onError(err as AxiosError);
    } finally {
      afterRequest();
    }
  }

  static async checkClientAuthenticated() {
    try {
      const client = this.getClientAPI();
      try {
        const response = await client.post(API.USER_AUTH_CHECK);
        if (response.status === 200) return true;
        else return false;
      } catch (err) {
        return false;
      }
    } catch (err) {
      // console.log('err', err);
      return false;
    }
  }

  static async callServerServerSide(
    endpoint: string,
    data: { [key: string]: string | number | boolean | null | undefined },
    onResponse: (res: AxiosResponse) => void,
    onError: (err: AxiosError) => void,
    beforeRequest: () => void,
    afterRequest: () => void,
    method = 'get'
  ) {
    beforeRequest();
    let clientApi: AxiosInstance;
    if (
      endpoint === API.PHONE_CODE_SEND ||
      endpoint === API.PHONE_CODE_VERIFY ||
      endpoint === API.USER_CREATE ||
      endpoint === API.TOP_PRODUCTS ||
      endpoint === API.TOP_SHOPS ||
      endpoint === API.USERNAME_NUMBER_CHECK
    ) {
      clientApi = axios.create({
        baseURL: SERVER_URL,
        withCredentials: true,
        headers: {
          'X-CSRFTOKEN': Cookies.get('csrftoken'),
        },
      });
    } else clientApi = this.getClientAPI();

    try {
      const response = await clientApi.request({
        url: endpoint,
        method: method,
        data: data,
      });

      onResponse(response);
    } catch (err) {
      // alert(err);
      onError(err as AxiosError);
    } finally {
      afterRequest();
    }
  }
}
