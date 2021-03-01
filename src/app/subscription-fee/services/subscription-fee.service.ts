import { StoresClient } from 'src/app/smart-stores/clients/StoresClient';
import { Product } from './../../smart-stores/products/models/product.model';
import { getProduct } from './../../smart-stores/products/@store/products/products.reducer';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionData, FeeData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionFeeService {
  currentDate = new Date();

  constructor(private configService: ConfigService, private http: HttpClient) { }
  public currentMonth = this.currentDate.getMonth();
  public currentYear = this.currentDate.getFullYear();

  public getSubscriptionData(): SubscriptionData[] {
    // const body = {
    //   country: 'France',
    //   referenceId,
    //   orderStatus
    // };
    // return this.http.post<OrdersData[]>(`${environment.dataOrderApiURI}/storeorders/getall`, body, {
    //   headers: this.configService.buildHeaderRequest()
    // });
    const subscriptionData = [
      {
        id: 1,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 2,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Bonhomme de bois -levallais',
        priceExclT: 100,
      },
      {
        id: 3,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 4,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 5,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 6,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 7,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 8,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 9,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 10,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 11,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 12,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
      {
        id: 13,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: 'Nike Store',
        priceExclT: 100,
      },
    ]
    return subscriptionData;
  }

  public getFeeData(): FeeData[] {
    const feeData = [
      {
        id: 1,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 2,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 3,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 4,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 5,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 6,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 7,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 8,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 9,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 10,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 11,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 12,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
      {
        id: 13,
        date: "12/12/2020",
        invoiceNumber: "#284155644",
        stores: "BR210 890",
        transferBef: 1200.54,
        paymentFee: -6.62,
        deliveryFee: -1.5,
        finalTransfer: 124.33,
      },
    ]
    return feeData;
  }
}
