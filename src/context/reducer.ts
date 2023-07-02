import { Actions } from '@/types/actions';
import { State } from '@/types/state';

const Reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        fetching: action.payload.fetching,
      };
    case 'USER':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'ACCESS_TOKEN':
      return {
        ...state,
        access_token: action.payload.access_token,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default Reducer;
