import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';

import { TagsClient } from './clients/TagsClient';
import { ConfigService } from '../shared/config.service';
import { SmartStoresRoutingModule } from './smart-stores.routing-module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryDetailsComponent } from './products/containers/category/details/categoryDetails.component';
import { InformationDetailsComponent } from './products/containers/information/details/infoDetails.component';

@NgModule({
  declarations: [
    IndexComponent,
  //  CategoryDetailsComponent,
    InformationDetailsComponent,
  ],
  providers: [
    TagsClient,
    ConfigService
  ],
  imports: [
    CommonModule,
    SmartStoresRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
  ]
})
export class SmartStoresModule { }
