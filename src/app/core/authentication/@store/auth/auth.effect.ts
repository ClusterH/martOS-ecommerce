import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from 'src/app/@store';
import * as fromActions from './auth.action';
import { StoresService } from '../../stores.service';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/smart-stores/services/Store.service';
import { AuthService } from '../../auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private storesService: StoresService,
    private storeService: StoreService,
    private toast: ToastrService,
    private authService: AuthService
  ) { }

  @Effect()
  loadStores$: Observable<fromActions.LoadStoresSuccess | fromActions.LoadStoresFail> = this.actions$.pipe(
    ofType(fromActions.LOAD_STORES),
    exhaustMap(action => {
      return this.storesService.getAll().pipe(
        map((res) => {
          this.storeService.selectedStore.next(res[0]);
          return new fromActions.LoadStoresSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          console.log('error un aothoerized ', error);
          // this.authService.signout();
          this.toast.error(error && error.title ? error.title : 'Something went wrong');
          return of(new fromActions.LoadStoresFail(res));
        })
      );
    })
  );
}
