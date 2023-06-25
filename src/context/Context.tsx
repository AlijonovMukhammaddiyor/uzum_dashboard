/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { createContext, useEffect, useReducer } from 'react';

import { API } from '@/lib/api';

import { SERVER_URL } from '@/constant/env';
import Reducer from '@/context/reducer';

import { Actions } from '@/types/actions';
import { INITIAL_STATE, State } from '@/types/state';

export const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Actions>;
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
  }, []);

  useEffect(() => {
    const client = API.getClientAPI();

    dispatch({ type: 'LOADING', payload: { fetching: true } });

    client.get(`${SERVER_URL}${API.CURRENT_USER}`).then((res) => {
      dispatch({
        type: 'LOGIN',
        payload: { user: res.data },
      });
    });
  }, []);

  const contextData = {
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {mounted && children}
    </AuthContext.Provider>
  );
};
