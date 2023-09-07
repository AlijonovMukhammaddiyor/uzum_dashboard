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
    case 'FAVOURITE_SHOPS':
      return {
        ...state,
        favourite_sellers: action.payload.favourite_sellers,
      };
    case 'FAVOURITE_PRODUCTS':
      return {
        ...state,
        favourite_products: action.payload.favourite_products,
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

    case 'PATH':
      return {
        ...state,
        path: action.payload.path,
      };

    default:
      return state;
  }
};

export default Reducer;
