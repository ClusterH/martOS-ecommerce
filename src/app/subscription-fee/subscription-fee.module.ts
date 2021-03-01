import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material';
import { SubscriptionFeeComponent } from './subscription-fee.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { FeeComponent } from './components/fee/fee.component';
import { SubscriptionFeeRoutingModule } from './subscription-fee.routing-module';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [SubscriptionFeeComponent, SubscriptionComponent, FeeComponent],
  imports: [
    CommonModule,
    SubscriptionFeeRoutingModule,
    SharedModule,
    MatSortModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class SubscriptionFeeModule { }
