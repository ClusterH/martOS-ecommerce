import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListingComponent } from './orders-listing.component';
import { OrdersItemComponent } from './orders-item/orders-item.component';
import { StorePipeModule } from 'src/app/pipes/store-filter/store-filter.module';
// import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrdersListingComponent,
    OrdersItemComponent

  ],
  imports: [
    CommonModule,
    // RouterModule,
    StorePipeModule
  ],
  exports: [OrdersListingComponent],
  entryComponents: []
})
export class OrdersListingModule { }
