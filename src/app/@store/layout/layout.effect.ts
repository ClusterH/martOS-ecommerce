import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromLayoutAction from './layout.action';

import { Observable, fromEvent, of } from 'rxjs';
import { debounceTime, map, tap, exhaustMap } from 'rxjs/operators';

@Injectable()
export class LayoutEffects {
  constructor(
    private actions$: Actions,
  ) { }

  @Effect()
  windowResize$: Observable<fromLayoutAction.ResizeWindow> = fromEvent(window, 'resize').pipe(
    debounceTime(300),
    map((e: Event) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      return new fromLayoutAction.ResizeWindow({ width, height });
    })
  );
}
