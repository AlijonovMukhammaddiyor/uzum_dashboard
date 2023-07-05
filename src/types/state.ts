import { UserType } from '@/types/user';

export interface State {
  user: UserType | null;
  fetching: boolean;
  lang: string;
  access_token?: string;
  path: Record<string, string> | null;
}

let state = null;
if (typeof window !== 'undefined') {
  state = window.localStorage.getItem('state');
}

export const INITIAL_STATE: State = state
  ? JSON.parse(state)
  : {
      user: null,
      fetching: false,
      lang: 'uz',
      path: null,
    };
