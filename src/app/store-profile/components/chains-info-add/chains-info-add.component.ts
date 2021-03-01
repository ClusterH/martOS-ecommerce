import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProfileService } from '../../services/store-profile.service';
import { Subscription } from 'rxjs';
import { ChainStoresClient } from '../../clients/chains.client';
import { StoresClient } from '../../../smart-stores/clients/StoresClient';
import { Store } from '../../../smart-stores/models/Store';
import { ChainStore } from '../../models/ChainStore';
import { UserClient } from '../../clients/user.client';
import { BusinessAddress } from '../../models/BusinessAddress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { chain } from 'lodash';

@Component({
  selector: 'app-chains-info-add',
  templateUrl: './chains-info-add.component.html',
  styleUrls: ['./chains-info-add.component.scss']
})
export class ChainsInfoAddComponent implements OnInit, OnDestroy {

  // @Input() calledFor: string;
  stores: Store[];
  chainAddForm: FormGroup;
  addChainPart1 = true;
  existingStoreStatus = false;
  addNewStoreStatus = false;
  selectStoreStatus = false;
  calledFor: string;
  imageURL: string;
  selectedShopValue = [];
  shopValueArray = [];
  addStoreModalService$: Subscription;
  businessAddress: BusinessAddress;
  storesToAdd: Store[] = [];
  mainImage;
  hideImageCrop = true;
  imageChangedEvent;

  constructor(
    private chainStoresClient: ChainStoresClient,
    private storesClient: StoresClient,
    private formBuilder: FormBuilder,
    private storeProfileService: StoreProfileService,
    private userClient: UserClient,
    public dialogRef: MatDialogRef<ChainsInfoAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit() {

    return new Promise(async (resolve) => {
    (await this.storesClient.getAll()).subscribe((stores) => {
      resolve(stores);
      this.stores = stores;
      stores.forEach(store => {
        const shop = {
          id: store.id,
          name: store.name
        };

        this.shopValueArray.push(shop);
      });
    });

    this.addStoreModalService$ = this.storeProfileService
      .addStoreModalService.subscribe(
        res => {
          console.log('store form value', res);
          this.onNoClick();
        }, err => {
          console.log('err', err);
        }
      );

    this.chainAddForm = this.formBuilder.group({
      image_data: [''],
      display_name: [''],
      company_name: [''],
      siren_n: [''],
      address: [''],
      city: [''],
      postal_code: [''],
      country: [''],
      store_array: ['']
    });

    const businessAddress = this.userClient.getStoredBusinessAddress();
    this.chainAddForm = this.formBuilder.group({
      image_data: [''],
      display_name: [''],
      company_name: [businessAddress.businessName],
      siren_n: [businessAddress.businessNumber],
      address: [businessAddress.street],
      city: [businessAddress.city],
      postal_code: [businessAddress.postalCode],
      country: [businessAddress.country],
      store_array: ['']
    });


    this.calledFor = this.data.calledFor;
  });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addChainButton() {
    this.addChainPart1 = false;
    this.selectStoreStatus = true;
  }

  addChainSelectStore(value) {
    this.selectStoreStatus = false;
    if (value === 'existing') {
      this.existingStoreStatus = true;
    } else {
      this.addNewStoreStatus = true;
    }
  }

  async submitStoreAtion() {

    console.log(this.chainAddForm.getRawValue());
    const chainStore: ChainStore = {
      name: this.chainAddForm.get('display_name').value,
      stores: this.storesToAdd,
      id: 0,
      expiry: ''
    };

    return new Promise(async (resolve) => {
    (await this.chainStoresClient.create(chainStore)).subscribe(async (chains) => {
      resolve(chains);
      (await this.chainStoresClient.getAll()).subscribe(async (chains) => {
        resolve(chains);
        this.storeProfileService.changechains(chains);
        (await this.storesClient.getComplete()).subscribe((stores) => {
          resolve(stores);
          this.stores = stores;
          // this.storeCount = stores.length
          this.storeProfileService.changestores(stores);
        });
      });
    });
    
    console.log('value 81', this.chainAddForm.value);
    this.onNoClick();
  });
  }

  selectedValueArray() {
    console.log(this.selectedShopValue);
    this.selectedShopValue.forEach(store => {
      const storeToAdd: Store = store;
      this.storesToAdd.push(storeToAdd);
    });
    // console.log('value', this.selectedShopValue);
    this.chainAddForm.patchValue({
      store_array: this.selectedShopValue
    });
  }

  // Image Preview

  showPreview(event) {
    this.hideImageCrop = false;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.mainImage = event.base64 as string;
    this.chainAddForm.patchValue({
      image_data: event.base64 as string
    });
  }
  ngOnDestroy() {
    this.addStoreModalService$.unsubscribe();
  }

}
