import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {Store} from '../../../smart-stores/models/Store';
import { Store as _Store, select } from "@ngrx/store";
import * as fromRoot from "src/app/@store";
import * as fromAuth from '../../../core/authentication/@store/auth/auth.selector';
import { takeUntil } from 'rxjs/operators';
import { UserClient } from '../../clients/user.client';
import { UserStaff } from '../../../staff-management/models/user-staff.model';
import { UserStaffRequest } from '../../../staff-management/models/user-staff-request.model';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

    private store$: Observable<Store>;
    private unsubscribe$: Subject<void> = new Subject();
    private user: UserStaff;

    personalForm: FormGroup;
    isTabOpen: boolean = false;
    isEdit: boolean = false;

    constructor(
      private formBuilder: FormBuilder,
      public store: _Store<fromRoot.State>,
      private userClient: UserClient
    ) {
      this.store$ = this.store.pipe(select(fromAuth.selectSelectedStore)); 

    }
    
    async ngOnInit() {
      
    return new Promise(async (resolve) => {
      (await this.store$.pipe(takeUntil(this.unsubscribe$))).subscribe(async store => {
        if (!store) {
          return;
        }
        
        resolve(store);
        (await this.userClient.getInfoNoImage()).subscribe((user) => {
          resolve(user);
          this.personalForm = this.formBuilder.group({
            first_name: user.name,
            last_name: user.familyName,
            email: user.email,
            phone_number: user.phoneNumber     
          });
          this.user = user;
        });
      });
    });
    }

    tabAction(value){
        this.isTabOpen = value;
        this.isEdit = false;
        console.log('isTabOpen', this.isTabOpen);
        console.log('isEdit', this.isEdit);
    }

    editActionPersonal(){
        this.isEdit = true;
        console.log('isEdit', this.isEdit);
    }
    
    async updateProfile(){
        this.isEdit = false;
        // var userToUpdate = this.personalForm.getRawValue();
        let request = <UserStaffRequest>{
          id: this.user.id,
          email: this.personalForm.get('email').value,
          name: this.personalForm.get('first_name').value,
          familyName: this.personalForm.get('last_name').value,
          phoneNumber: this.personalForm.get('phone_number').value,
          userName: this.user.userName,
          isEnabled: true
        };

        (await this.userClient.updateUserStaff(request)).subscribe((user) => {
  
          });
    }
}
