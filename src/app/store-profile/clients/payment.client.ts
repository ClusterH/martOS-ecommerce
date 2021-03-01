import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CardInfo } from '../models/CardInfo';
import { ConfigService } from '../../shared/config.service';
import { DeleteCardRequest } from '../models/DeleteCardRequest';
import { CreatePaymentRequest } from '../models/CreatePaymentRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentClient {
  constructor(private configService: ConfigService, private http: HttpClient) { }

  public async getPayment() {
    return await this.http.get<CardInfo>(`${environment.paymentApiURI}/Card`, {
               headers: this.configService.buildHeaderRequest()
           });
  }

  public async delete(request: DeleteCardRequest) {
    return await this.http.post(`${environment.paymentApiURI}/Card/delete`, request, {
               headers: this.configService.buildHeaderRequest()
           });
  }

  public async create(request: CreatePaymentRequest) {
    return await this.http.post(`${environment.paymentApiURI}/Card`, request, {
               headers: this.configService.buildHeaderRequest()
           });
  }
}
