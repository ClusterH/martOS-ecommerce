import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StaffManagementComponent } from './components/staff-management/staff-management.component';
import { StaffManagementRoutingModule } from './staff-management-routing.module';
import { FormsModule } from '@angular/forms';
import { DialogUploadContractComponent } from './components/dialog-upload-contract/dialog-upload-contract.component';

@NgModule({
  declarations: [StaffManagementComponent, DialogUploadContractComponent],
  imports: [
    CommonModule,
    RouterModule,
    StaffManagementRoutingModule,
    SharedModule
  ],
  entryComponents: [DialogUploadContractComponent,]
})
export class StaffManagementModule { }
