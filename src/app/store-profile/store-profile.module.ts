import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { NgSelectModule } from '@ng-select/ng-select';

import { StoreProfileRoutingModule } from './store-profile-routing.module';
import { MyStoreComponent } from './my-store/my-store.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { PaymentInfoUpdateComponent } from './components/payment-info-update/payment-info-update.component';
import { ChainsInfoComponent } from './components/chains-info/chains-info.component';
import { ChainsInfoUpdateComponent } from './components/chains-info-update/chains-info-update.component';
import { ChainsInfoAddComponent } from './components/chains-info-add/chains-info-add.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { StoreInfoAddComponent } from './components/store-info-add/store-info-add.component';
import { StoreInfoUpdateComponent } from './components/store-info-update/store-info-update.component';
import { StoreInfoDaysComponent } from './components/store-info-days/store-info-days.component';
import { StoreEditAddressComponent } from './components/store-edit-address/store-edit-address.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DaysPipePipe } from './clients/days-pipe.pipe';
import { StoreBlockComponent } from './components/store-info/store-block/store-block.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { IbanInfoComponent } from './components/iban-info/iban-info.component';
import { IbanInfoUpdateComponent } from './components/iban-info-update/iban-info-update.component';


@NgModule({
  declarations: [
    MyStoreComponent,
    PersonalInfoComponent,
    PaymentInfoComponent,
    PaymentInfoUpdateComponent,
    IbanInfoUpdateComponent,
    ChainsInfoComponent,
    ChainsInfoUpdateComponent,
    ChainsInfoAddComponent,
    StoreInfoComponent,
    StoreInfoAddComponent,
    StoreInfoUpdateComponent,
    StoreInfoDaysComponent,
    StoreEditAddressComponent,
    DaysPipePipe,
    StoreBlockComponent,
    IbanInfoComponent
  ],
  imports: [
    CommonModule,
    StoreProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSliderModule,
    NgSelectModule,
    ImageCropperModule,
    TimepickerModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ],
  entryComponents: [
    ChainsInfoAddComponent,
    PaymentInfoUpdateComponent,
    IbanInfoUpdateComponent,
    StoreInfoAddComponent,
    StoreInfoDaysComponent,
    StoreEditAddressComponent
  ],
})
export class StoreProfileModule { }
