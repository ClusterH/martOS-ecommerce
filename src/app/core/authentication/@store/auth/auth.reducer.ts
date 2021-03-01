import * as fromActions from './auth.action';

import { Store } from 'src/app/smart-stores/models/Store';

export class AuthState {
  stores: Store[];
  selectedStore: Store;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  stores: [],
  selectedStore: null,
  loading: false,
  error: ''
};

export function authReducer(
  state: AuthState = initialState,
  action: fromActions.AuthAction
): AuthState {
  switch (action.type) {
    case fromActions.LOAD_STORES: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_STORES_SUCCESS: {
      return {
        ...state,
        stores: action['payload'],
        selectedStore: action['payload'][0] || null,
        loading: false,
      };
    }

    case fromActions.LOAD_STORES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action['payload'],
      };
    }

    case fromActions.SELECT_STORE: {
      return {
        ...state,
        selectedStore: action['payload'],
      };
    }

    default: {
      return state;
    }
  }
}

export const getAuthState: any = (state: AuthState): AuthState => state;

export const getStores: any = (state: AuthState): Store[] => state.stores;
export const getSelectedStore: any = (state: AuthState): Store => state.selectedStore;
