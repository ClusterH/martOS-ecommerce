

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var requestName = request.url.split('/');
    var length = requestName.length - 1;

    if (requestName[length] === "createAccount") {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request).pipe(
      tap(
        event => { },
        err => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            // this.auth.cleanupStorage();
            // this.auth.login();
          }
        }
      )
    );
  }
}
