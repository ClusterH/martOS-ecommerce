import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/authentication/auth.guard';
import { SubscriptionFeeComponent } from './subscription-fee.component';


const routes: Routes = [
  {
    path: '',
    component: SubscriptionFeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SubscriptionFeeRoutingModule { }
