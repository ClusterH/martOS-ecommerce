import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as authReducer from './auth/auth.reducer';

export interface AuthFeatureState {
    auth: authReducer.AuthState;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
    auth: authReducer.authReducer
};

export const getAuthFeatureState: any = createFeatureSelector('auth');
