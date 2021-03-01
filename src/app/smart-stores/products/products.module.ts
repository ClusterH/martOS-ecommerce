import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from '../products/@store';

import { FilterOptionsPipe } from './utils/filter-options.pipe';
import { OptionDetailsComponent } from './containers/optionDetails/optionDetails.component';
import { CategoryDetailsComponent } from './containers/category/details/categoryDetails.component';

import {
  ProductsNavigationComponent,
  DialogEditOptionsComponent,
  DialogEditVariantComponent,
  DialogAddOptionsComponent
} from './components';

import {
  ProductsComponent,
  ArticleComponent,
  ArticleDetailsComponent,
  CategoryComponent,
  OptionComponent,
  InformationComponent,
  CreateProductComponent
} from './containers';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ArrayJoinPipe } from './pipes/array-join/array-join.pipe';
import { ColorPickerModule } from 'ngx-color-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ProductsComponent,
    ArticleComponent,
    ProductsNavigationComponent,
    ArticleDetailsComponent,
    CategoryComponent,
    OptionComponent,
    OptionDetailsComponent,
    CategoryDetailsComponent,
    InformationComponent,
    CreateProductComponent,
    DialogEditOptionsComponent,
    DialogEditVariantComponent,
    FilterOptionsPipe,
    ArrayJoinPipe,
    DialogAddOptionsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    AngularEditorModule,
    AngularFileUploaderModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ColorPickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
  ],
  entryComponents: [DialogEditOptionsComponent, DialogEditVariantComponent, DialogAddOptionsComponent]
})
export class ProductsModule { }
