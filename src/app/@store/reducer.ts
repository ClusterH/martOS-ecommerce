import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from './layout/layout.reducer';

import { RouterStateUrl } from './router';

export interface State {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    layout: fromLayout.layoutReducer,
};

export const getAppState: any = createFeatureSelector<State>('root');
