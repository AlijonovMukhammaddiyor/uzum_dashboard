import { Actions } from '@/types/actions';
import { State } from '@/types/state';

const Reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        fetching: action.payload.fetching,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default Reducer;
