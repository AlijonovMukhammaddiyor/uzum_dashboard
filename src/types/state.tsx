export interface State {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  fetching: boolean;
  lang: string;
}

export const INITIAL_STATE: State = {
  user: null,
  fetching: false,
  lang: 'uz',
};
