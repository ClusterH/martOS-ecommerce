import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { DashboardRoutingModule } from './dashboards.routing-module';
import { OrdersListingModule } from '../orders/components/orders-listing/orders-listing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    OrdersListingModule,
    SharedModule
  ],
  declarations: [DashboardsComponent]
})
export class DashboardsModule { }
