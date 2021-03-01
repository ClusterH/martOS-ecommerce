import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProfileService } from '../../services/store-profile.service';
import { ChainsInfoAddComponent } from '../chains-info-add/chains-info-add.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError, Observable, Subject, Subscription } from 'rxjs';
import { ChainStoresClient } from '../../clients/chains.client';
import { chain } from 'lodash';
import { Store } from '../../../smart-stores/models/Store';
import { StoresClient } from '../../../smart-stores/clients/StoresClient';
import { ChainStore } from '../../models/ChainStore';
import { UserClient } from '../../clients/user.client';
import { BusinessAddress } from '../../models/BusinessAddress';
import { GetChainByIdRequest } from '../../models/GetChainByIdRequest';

@Component({
  selector: 'app-chains-info',
  templateUrl: './chains-info.component.html',
  styleUrls: ['./chains-info.component.scss']
})
export class ChainsInfoComponent implements OnInit, OnDestroy {
  chainStores: ChainStore[];
  stores: Store[];
  storeCount: number;
  businessAddress: BusinessAddress;

  constructor(
    private chainStoresClient: ChainStoresClient,
    private formBuilder: FormBuilder,
    private storeProfileService: StoreProfileService,
    public dialog: MatDialog,
    private storesClient: StoresClient,
    private userClient: UserClient

  ) { }

  closeChainUpdateModalService$: Subscription;
  currentChainStore: Subscription;
  chainEditForm: FormGroup;
  isEdit: boolean = false;
  isTabOpen: boolean = false;
  calledFor: string = '';

  async ngOnInit() {
    this.currentChainStore = this.storeProfileService.currentChainStores.subscribe(val => {
      if (!val) {
        return;
      }
      this.chainStores = val;
    });

    this.chainStoresClient.getAll().subscribe((chains) => {
      this.chainStores = chains;
      this.chainStoresClient.chainStores = chains;
    });

    return new Promise(async (resolve) => {
    (await this.storesClient.getAll()).subscribe((stores) => {
      resolve(stores);
      this.stores = stores;
      this.storeCount = stores.length;
    });


    this.closeChainUpdateModalService$ = this.storeProfileService
      .closeChainUpdateModalService.subscribe(
        res => {
          console.log('res', res);
          this.calledFor = '';
        }, err => {
          console.log('err', err);
        }
      );
    });
  }

  editAction(chain: ChainStore) {
    if (this.businessAddress === undefined || this.businessAddress == null) {
      const businessAddress = this.userClient.getStoredBusinessAddress();
      this.businessAddress = businessAddress;
      this.storeProfileService.changeBusinesAddress(businessAddress);
    }

    this.storeProfileService.changechain(chain);
    this.isEdit = true;
    this.calledFor = 'update';
    console.log('this.calledFor', this.calledFor);
  }

  addAction() {
    this.isEdit = true;
    this.calledFor = 'add';
    this.openDialog();
  }

  deleteAction(chain: ChainStore) {
    const getChainByIdRequest: GetChainByIdRequest = {
      id: chain.id
    };

    (this.chainStoresClient.delete(getChainByIdRequest)).subscribe(async (val) => {
      this.chainStoresClient.getAll().subscribe((chains) => {
        this.storeProfileService.changechains(chains);
      });
    });
    this.isEdit = false;
    this.calledFor = 'delete';
  }

  detailAction(chain: ChainStore) {
    if (this.businessAddress === undefined || this.businessAddress == null) {
      const businessAddress = this.userClient.getStoredBusinessAddress();
      this.businessAddress = businessAddress;
      this.storeProfileService.changeBusinesAddress(businessAddress);
      console.log(this.businessAddress);

    }
    console.log(chain);
    this.storeProfileService.changechain(chain);
    this.isEdit = false;
    this.calledFor = 'detail';
    console.log('this.calledFor', this.calledFor);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChainsInfoAddComponent, {
      data: {
        calledFor: this.calledFor
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    this.closeChainUpdateModalService$.unsubscribe();
    if(this.currentChainStore){
      this.currentChainStore.unsubscribe();
    }
    
     this.storeProfileService.changechains(null);
  }

  tabAction(value) {
    this.isTabOpen = value;
  }

}
