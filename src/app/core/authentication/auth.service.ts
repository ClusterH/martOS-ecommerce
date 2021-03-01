import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';

import { BaseService } from '../../shared/base.service';
import { AuthConfig } from './auth.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings());
  private user: User | null;

  constructor(private http: HttpClient, private configService: AuthConfig, private router: Router) {
    super();

    this.manager.getUser().then(user => {
      this.user = user;
      this._authNavStatusSource.next(this.isAuthenticated());
    });
  }

  login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this.localLogin(this.user);
    this._authNavStatusSource.next(this.isAuthenticated());
  }

  register(userRegistration: any) {
    return this.http.post(this.configService.authApiURI + '/account', userRegistration).pipe(catchError(this.handleError));
  }

  isAuthenticated(): boolean {
    const expiresAt = localStorage.getItem('expires_at');
    // alert('logout');

    if (expiresAt) {
      const dateExpiry = Date.parse(expiresAt);
      const dateNow = new Date().getTime();
      if (dateNow > dateExpiry) {
        console.log('logout');
        this.signout();
        return false;
      } else {
        return true;
      }
    }
    // return true;
  }

  private localLogin(user: User): void {

    const expiryInMinutes = user.expires_in / 60;
    const twentyMinutesLater = new Date();

    console.log(twentyMinutesLater);
    twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + expiryInMinutes);
    console.log(expiryInMinutes);
    console.log(twentyMinutesLater);
    localStorage.setItem("access_token", user.access_token);
    localStorage.setItem("id_token", user.id_token);
    localStorage.setItem("expires_at", twentyMinutesLater.toString());
  }

  get authorizationHeaderValue(): string {

    return this.user ? `${this.user.token_type} ${this.user.access_token}` : null;

  }

  getToken(): string {
    return this.user ? `${this.user.access_token}` : null;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  cleanupStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('businessAddress')
  }

  async signout() {
    this.cleanupStorage();
    this.router.navigateByUrl('/');
    await this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://51.140.48.107:8080',
    client_id: 'angular_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid api1 storepayment storeorders',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
