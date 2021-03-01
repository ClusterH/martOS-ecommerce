import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getOrders(referenceId, orderStatus): Observable<Order[]> {
    const body = {
      country: 'France',
      referenceId,
      orderStatus
    };
    return this.http.post<Order[]>(`${environment.dataOrderApiURI}/storeorders/getall`, body, {
      headers: this.configService.buildHeaderRequest()
    });
  }
}
