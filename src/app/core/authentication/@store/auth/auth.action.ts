import { Action } from '@ngrx/store';
import { Store } from 'src/app/smart-stores/models/Store';

export const LOAD_STORES = '[Auth] Load Stores';
export const LOAD_STORES_SUCCESS = '[Auth] Load Stores Success';
export const LOAD_STORES_FAIL = '[Auth] Load Stores Fail';
export class LoadStores implements Action {
  readonly type: string = LOAD_STORES;
}
export class LoadStoresSuccess implements Action {
  readonly type: string = LOAD_STORES_SUCCESS;
  constructor(public payload: Store[]) { }
}
export class LoadStoresFail implements Action {
  readonly type: string = LOAD_STORES_FAIL;
  constructor(public payload: any) { }
}

export const SELECT_STORE = '[Auth] Select Store';
export class SelectStore implements Action {
  readonly type: string = SELECT_STORE;
  constructor(public payload: Store) { }
}

export type AuthAction = LoadStores
  | LoadStoresSuccess
  | LoadStoresFail
  | SelectStore;
