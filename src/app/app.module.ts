import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfigService } from './shared/config.service';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

// @ngrx
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects, metaReducers, reducers } from './@store/index';
import { environment } from 'src/environments/environment';

/* Module Imports */
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { ShellModule } from './shell/shell.module';
import { SharedModule } from './shared/shared.module';
import { SmartStoresModule } from './smart-stores/smart-stores.module';
import { TokenInterceptor } from './core/authentication/token.interceptor';
import { StoresService } from './smart-stores/services/StoresService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';
import { SidebarModule } from 'ng-sidebar';
import { RegisterComponent } from './_auth/register/register.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LandingComponent } from './landing/landing.component';
import { SliderModule } from 'angular-image-slider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LeadingHeaderComponent } from './_header/leading-header/leading-header.component';
import { HomeHeaderComponent } from './_header/home-header/home-header.component';

import { PlanListComponent } from './_auth/plan-list/plan-list.component';
import { IndexComponent } from './home/index/index.component';
import { StaffManagementModule } from './staff-management/staff-management.module';
import { OrdersModule } from './orders/orders.module';
import { DatasModule } from './datas/datas.module';
import { SubscriptionFeeModule } from './subscription-fee/subscription-fee.module';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { AuthConfig } from './core/authentication/auth.config';
import { TempSignOutComponent } from './pages/temp-sign-out/temp-sign-out.component';

import { MyProfileComponent } from './my-profile/my-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TimepickerModule, TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { CguComponent } from './_auth/cgu/cgu.component';
import { RegisterSuccessComponent } from './_auth/register/register-success/register-success.component';
import { RegisterFailureComponent } from './_auth/register/register-failure/register-failure.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    RegisterComponent,
    LandingComponent,
    LeadingHeaderComponent,
    HomeHeaderComponent,
    PlanListComponent,
    CguComponent,
    RegisterSuccessComponent,
    RegisterFailureComponent,
    IndexComponent,
    TempSignOutComponent
    ,   // StaffManagementComponent
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    AccountModule,
    SmartStoresModule,
    AppRoutingModule,
    ShellModule,
    SharedModule,
    StaffManagementModule,
    MaterialModule,
    SidebarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SliderModule,
    MatSnackBarModule,
    SlickCarouselModule,
    OrdersModule,
    DatasModule,
    SubscriptionFeeModule,
    MatDialogModule,
    ImageCropperModule,

    // @ngrx
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    TimepickerModule.forRoot(),
  ],
  providers: [
    TimepickerConfig,
    StoresService,
    AuthConfig,
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
