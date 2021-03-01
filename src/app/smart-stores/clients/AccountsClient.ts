import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateAccountRequest } from '../requests/CreateAccountRequest';
import { ConfigService } from '../../shared/config.service';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AccountsClient {
  accountsUrl: string;

  private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
    this.configService = configService;
    this.accountsUrl = `${this.configService.authApiURI}/Users`;
  }

  public async createAccount(request: CreateAccountRequest) {
    return await this.httpClient.post(`${this.accountsUrl}/createAccount`, request).pipe(
      timeout(300000)
    );
    }
}

