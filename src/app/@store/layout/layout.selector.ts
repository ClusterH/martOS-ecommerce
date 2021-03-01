import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from '../reducer';
import * as fromLayout from './layout.reducer';

export const selectSidebarOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getSidebarOpened
);

export const selectIsTablet: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsTablet
);

export const selectIsLaptop: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsLaptop
);

export const selectIsDesktop: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsDesktop
);
