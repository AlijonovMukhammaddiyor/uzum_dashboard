/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { createContext, useEffect, useReducer } from 'react';

import API from '@/lib/api';

import Reducer from '@/context/reducer';

import { Actions } from '@/types/actions';
import { INITIAL_STATE, State } from '@/types/state';

export const Context = createContext<{
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
    const api = new API(null);
    api.updateUserTokens();
  }, []);

  // save the state to local storage when it changes
  useEffect(() => {
    localStorage.setItem(
      'state',
      JSON.stringify({
        ...state,
        user: null,
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
