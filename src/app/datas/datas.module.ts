import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material';
import { DatasComponent } from './datas.component';
import { DatasRoutingModule } from './datas.routing-module';
import { DataOrdersComponent } from './components/data-orders/data-orders.component';
import { DataProductComponent } from './components/data-product/data-product.component';
import { DataSalesComponent } from './components/data-sales/data-sales.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [DatasComponent, DataOrdersComponent, DataProductComponent, DataSalesComponent],
  imports: [
    CommonModule,
    DatasRoutingModule,
    SharedModule,
    MatSortModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class DatasModule { }
