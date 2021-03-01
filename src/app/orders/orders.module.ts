import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ArticleRemoveDialogComponent } from './components/dialogs/article-remove-dialog/article-remove-dialog.component';
import { CancelOrderDialogComponent } from './components/dialogs/candel-order-dialog/cancel-order-dialog.component';
import { MatSortModule } from '@angular/material';
import { OrdersRoutingModule } from './orders.routing-module';
import { OrdersComponent } from './orders.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersListingModule } from './components/orders-listing/orders-listing.module';
import { StorePipeModule } from '../pipes/store-filter/store-filter.module';



@NgModule({
  declarations: [
    ArticleRemoveDialogComponent,
    CancelOrderDialogComponent,
    OrdersComponent,
    PendingOrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    // RouterModule,
    SharedModule,
    MatSortModule,
    OrdersRoutingModule,
    OrdersListingModule,
    StorePipeModule
  ],
  entryComponents: [CancelOrderDialogComponent, ArticleRemoveDialogComponent]
})
export class OrdersModule { }
