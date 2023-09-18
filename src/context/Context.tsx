/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
import { AxiosResponse } from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Reducer from '@/context/reducer';

import { INITIAL_STATE, State } from '@/types/state';

export const Context = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: INITIAL_STATE,
  dispatch: () => undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 200);
    const api = new API(null);
    api.updateUserTokens();
    api
      .getCurrentUser()
      .then((res) => {
        if (res) {
          dispatch({
            type: 'USER',
            payload: {
              user: res,
            },
          });
          dispatch({
            type: 'REFERRAL',
            payload: {
              referred_by: res.referred_by,
            },
          });
          dispatch({
            type: 'ISPAID',
            payload: {
              is_paid: res.is_paid,
            },
          });
        }
      })
      .catch((err) => {
        logger(err, 'Error in get current user');
      });
  }, []);

  React.useEffect(() => {
    const api = new API(null);
    api
      .get<unknown, AxiosResponse<{ shops: any[] }>>(
        '/bot/shops/get?only_links=true'
      )
      .then((res) => {
        // setSavedShops(res.data.shops);
        logger(res.data, 'my shops 222');

        dispatch({
          type: 'FAVOURITE_SHOPS',
          payload: {
            favourite_sellers: res.data.shops,
          },
        });
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in shops2222');
      });
    api
      .get<unknown, AxiosResponse<{ products: string }>>(
        '/bot/products/get?only_ids=true'
      )
      .then((res) => {
        logger(res.data, 'my products222');
        dispatch({
          type: 'FAVOURITE_PRODUCTS',
          payload: {
            favourite_products: res.data.products,
          },
        });
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in products222');
      });
  }, []);

  // save the state to local storage when it changes
  useEffect(() => {
    localStorage.setItem(
      'state',
      JSON.stringify({
        ...state,
      })
    );
  }, [state]);

  const contextData = {
    state,
    dispatch,
  };

  return (
    <Context.Provider value={contextData}>
      {mounted && children}
    </Context.Provider>
  );
};

export const useContextState = () => React.useContext(Context);
