import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { NextApiRequest } from 'next/types';

import { SERVER_URL } from '@/constant/env';

export class API {
  // here, declare all endpoints of server
  static CURRENT_USER = '/api/users/me';
  static PHONE_CODE_SEND = '/users/phone/send/';
  static PHONE_CODE_VERIFY = '/users/phone/verify/';
  static USER_CREATE = '/users/';
  static TOP_PRODUCTS = '/product/top';
  static TOP_SHOPS = '/shop/top';

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
          window.location.href = '/login/';
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
                .catch((err) => {
                  window.localStorage.clear();
                  window.location.href = '/login/';
                  console.log(err);
                });
            } else {
              window.localStorage.clear();
              window.location.href = '/login/';
            }
          } else {
            window.localStorage.clear();
            window.location.href = '/login/';
          }
        }

        // Handle specific error codes/messages here
        window.localStorage.clear();
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
                .catch((err) => {
                  console.log(err);
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
    data: any,
    onResponse: (res: AxiosResponse) => void,
    onError: (err: any) => void,
    beforeRequest: () => void,
    afterRequest: () => void,
    method = 'get'
  ) {
    beforeRequest();
    let clientApi: AxiosInstance;
    if (
      endpoint === API.PHONE_CODE_SEND ||
      endpoint === API.PHONE_CODE_VERIFY ||
      API.USER_CREATE ||
      API.TOP_PRODUCTS ||
      API.TOP_SHOPS
    ) {
      clientApi = axios.create({
        baseURL: SERVER_URL,
        withCredentials: true,
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
      onError(err);
    } finally {
      afterRequest();
    }
  }

  static async callServerServerSide(
    endpoint: string,
    data: any,
    onResponse: (res: AxiosResponse) => void,
    onError: (err: any) => void,
    beforeRequest: () => void,
    afterRequest: () => void,
    method = 'get'
  ) {
    beforeRequest();
    let clientApi: AxiosInstance;
    if (
      endpoint === API.PHONE_CODE_SEND ||
      endpoint === API.PHONE_CODE_VERIFY ||
      API.USER_CREATE ||
      API.TOP_PRODUCTS ||
      API.TOP_SHOPS
    ) {
      clientApi = axios.create({
        baseURL: SERVER_URL,
        withCredentials: true,
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
      onError(err);
    } finally {
      afterRequest();
    }
  }
}
