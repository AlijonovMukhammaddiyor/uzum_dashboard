import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { NextApiRequest } from 'next/types';

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

  static getServerApi(req: NextApiRequest) {
    const serverApi = axios.create({
      baseURL: SERVER_URL,
      headers: {
        cookie: req.headers.cookie, // forward cookies
        'X-CSRFTOKEN': req.cookies['csrftoken'],
      },
    });

    serverApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (
          error.response.status === 401 &&
          originalRequest.url === '/api/token/refresh/'
        ) {
          return Promise.reject(error);
        }

        if (
          error.response.data.code === 'token_not_valid' &&
          error.response.status === 401 &&
          error.response.statusText === 'Unauthorized'
        ) {
          const refreshToken = req.cookies['refresh_token'];

          if (refreshToken) {
            const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

            // Check if token is expired
            const now = Math.ceil(Date.now() / 1000);
            if (tokenParts.exp > now) {
              return serverApi
                .post('/api/token/refresh/', { refresh: refreshToken })
                .then((response) => {
                  req.cookies['access_token'] = response.data.access;
                  req.cookies['refresh_token'] = response.data.refresh;

                  serverApi.defaults.headers['Authorization'] =
                    'Bearer ' + response.data.access;
                  originalRequest.headers['Authorization'] =
                    'Bearer ' + response.data.access;

                  return serverApi(originalRequest);
                })
                .catch((_) => {
                  //
                });
            } else {
              return Promise.reject(error);
            }
          } else {
            return Promise.reject(error);
          }
        }

        // Handle specific error codes/messages here

        return Promise.reject(error);
      }
    );

    return serverApi;
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
      let response: AxiosResponse;
      if (method.toLowerCase() === 'post') {
        response = await clientApi.request({
          url: endpoint,
          method: method,
          data: data,
        });

        onResponse(response);
      } else if (method.toLowerCase() === 'get') {
        response = await clientApi.request({
          url: endpoint,
          method: method,
          params: data,
        });
        onResponse(response);
      }
    } catch (err) {
      // alert(err);
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
