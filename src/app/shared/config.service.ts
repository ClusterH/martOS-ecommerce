import { Injectable } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {

    token: string;

    private authService: AuthService;
    constructor(authService: AuthService) {
      this.authService = authService;
    }

    buildHeaderRequest(): any {
      console.log(this.token = this.authService.authorizationHeaderValue);
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token = this.authService.authorizationHeaderValue
        })
      };
    }

    get authApiURI() {
      return 'http://51.140.48.107:8080/api';
    }

    get dataStoreApiURI() {
      return 'http://23.100.50.205:5000/api';
    }
}
