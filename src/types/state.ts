import { UserType } from '@/types/user';

export interface State {
  user: UserType | null;
  fetching: boolean;
  lang: string;
  access_token?: string;
}

export const INITIAL_STATE: State = {
  user: null,
  fetching: false,
  lang: 'uz',
};
