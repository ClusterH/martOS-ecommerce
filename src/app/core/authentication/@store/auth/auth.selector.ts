import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from './auth.reducer';
import * as fromAuthReducer from '../reducer';
import { Store } from 'src/app/smart-stores/models/Store';

export const selectAuthState: MemoizedSelector<fromRoot.State, fromAuth.AuthState> = createSelector(
  fromAuthReducer.getAuthFeatureState,
  (state: fromAuthReducer.AuthFeatureState) => state.auth
);

export const selectStores: MemoizedSelector<fromRoot.State, Store[]> = createSelector(
  selectAuthState,
  fromAuth.getStores,
);

export const selectSelectedStore: MemoizedSelector<fromRoot.State, Store> = createSelector(
  selectAuthState,
  fromAuth.getSelectedStore,
);
