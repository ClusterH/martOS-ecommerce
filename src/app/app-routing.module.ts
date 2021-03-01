import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { RegisterComponent } from './_auth/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { PlanListComponent } from './_auth/plan-list/plan-list.component';
import { AuthGuard } from './core/authentication/auth.guard';
import { StaffManagementComponent } from './staff-management/components/staff-management/staff-management.component';
import { TempSignOutComponent } from './pages/temp-sign-out/temp-sign-out.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CguComponent } from './_auth/cgu/cgu.component';

const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cgu', component: CguComponent },
  { path: 'plan-list', component: PlanListComponent },
  { path: 'sign-out', component: TempSignOutComponent },
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  // { path: 'home', component: IndexComponent },

  {
    path: 'users', component: StaffManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'datas',
    loadChildren: () => import('./datas/datas.module').then(m => m.DatasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription-fee/subscription-fee.module').then(m => m.SubscriptionFeeModule),
    canActivate: [AuthGuard]
  },

  { path: 'store', loadChildren: () => import('./store-profile/store-profile.module').then(m => m.StoreProfileModule) },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
