import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreInfoAddComponent } from '../store-info-add/store-info-add.component';
import { StoreProfileService } from '../../services/store-profile.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError, Observable, Subject, Subscription } from 'rxjs';
import { Store } from '../../../smart-stores/models/Store';
import { StoresClient } from '../../../smart-stores/clients/StoresClient';
import { UserClient } from '../../clients/user.client';
import { BusinessAddress } from '../../models/BusinessAddress';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})

export class StoreInfoComponent implements OnInit, OnDestroy {

  stores: Store[];
  storeCount: number;
  businessAddress: BusinessAddress;
  currentStoresSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private storeProfileService: StoreProfileService,
    private storesClient: StoresClient,
    private userClient: UserClient
  ) { }

  closeStoreUpdateModalService$: Subscription;
  isEdit = false;
  isTabOpen = false;
  calledFor = '';

  ngOnInit() {
    this.currentStoresSubscription = this.storeProfileService.currentStores.subscribe(val => {
      if (!val) {
        return;
      }
      console.log(val);
      this.stores = val;
    });

    return new Promise(async (resolve) => {
    (await this.storesClient.getComplete()).subscribe((stores) => {
      resolve(stores);
      this.stores = stores;
      this.storeCount = stores.length;
    });

    this.closeStoreUpdateModalService$ = this.storeProfileService
      .closeStoreUpdateModalService.subscribe(
        res => {
          this.calledFor = '';
        }, err => {
          console.log('err', err);
        }
      );    
    });
  }


  addAction() {

    this.isEdit = true;
    this.calledFor = 'add_store';
    this.openDialog();
  }


  openDialog() {
    const dialogRef = this.dialog.open(StoreInfoAddComponent, {
      data: {
        calledFor: this.calledFor
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  tabAction(value) {
    this.isTabOpen = value;
  }

  ngOnDestroy() {
    this.closeStoreUpdateModalService$.unsubscribe();

    if(this.currentStoresSubscription){
      this.currentStoresSubscription.unsubscribe();
    }
    
     this.storeProfileService.changestores(null);
  }

}
