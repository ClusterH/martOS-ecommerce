import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffManagementComponent } from './components/staff-management/staff-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: StaffManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StaffManagementRoutingModule { }