import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProfileService } from '../../services/store-profile.service';
import { ChainStore } from '../../models/ChainStore';
import { StoresClient } from '../../../smart-stores/clients/StoresClient';
import { StoreRequest } from '../../models/StoreRequest';
import { AddImageStore, Store } from '../../../smart-stores/models/Store';
import { UserClient } from '../../clients/user.client';
import { ChainStoresClient } from '../../clients/chains.client';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Store as _Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/core/authentication/@store/auth';
@Component({
  selector: 'app-store-info-add',
  templateUrl: './store-info-add.component.html',
  styleUrls: ['./store-info-add.component.scss']
})
export class StoreInfoAddComponent implements OnInit {

  @Input() calledFor: string;
  addStoreForm: FormGroup;
  imageURL: string;
  chains: ChainStore[] = [];
  mainImage;
  hideImageCrop = true;
  imageChangedEvent;
  constructor(
    private formBuilder: FormBuilder,
    private storeProfileService: StoreProfileService,
    private storesClient: StoresClient,
    public dialogRef: MatDialogRef<StoreInfoAddComponent>,
    private userClient: UserClient,
    private chainStoresClient: ChainStoresClient,
    public store: _Store<fromRoot.State>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.chains = [...this.chainStoresClient.chainStores];
    this.addStoreForm = this.formBuilder.group({
      image_data: [''],
      display_name: [''],
      company_name: [''],
      email: [''],
      phone_number: [''],
      siren_n: [''],
      address: [''],
      chainId: [null],
      city: [''],
      postal_code: [''],
      country: [''],
      delivery_service: [false],
      pick_up_service: [false]
    });


    const businessAddress = this.userClient.getStoredBusinessAddress();
    this.addStoreForm = this.formBuilder.group({
      image_data: [''],
      display_name: [''],
      company_name: [businessAddress.businessName],
      email: [businessAddress.email],
      phone_number: [businessAddress.phoneNumber],
      siren_n: [businessAddress.businessNumber],
      address: [''],
      chainId: null,
      city: [''],
      postal_code: [''],
      country: [''],
      delivery_service: [false],
      pick_up_service: [false]
    });
  }

  async addStoreSubmitForm() {
    // console.log('this.calledFor', this.calledFor);
    const store: Store = {
      address: this.addStoreForm.get('address').value,
      country: this.addStoreForm.get('country').value,
      name: this.addStoreForm.get('display_name').value,
      postalCode: this.addStoreForm.get('postal_code').value
    };
    // combobox instead
    const chain: number = +this.addStoreForm.get('chainId').value;
    if (chain === 0) {
      console.log('no chain selected');
      return;
    }

    const request: StoreRequest = {
      store,
      chainStoreId: chain
    };

    console.log(request);
    return new Promise(async (resolve) => {
    (await this.storesClient.create(request)).subscribe(async (val) => {
      resolve(val);
      // const imgreques: AddImageStore = {
      //   country: 'France',
      //   refStoreId: val.id,
      //   base64: this.addStoreForm.get('image_data').value
      // };
      // this.storesClient.addStoreImage(imgreques).subscribe(next => {
      //   console.log(next);
      // });
      this.store.dispatch(new fromAuth.LoadStores());
      (await this.storesClient.getComplete()).subscribe((stores: Store[]) => {
        resolve(stores);
        this.storeProfileService.changestores(stores);
      });
    });

    if (this.calledFor === 'add') {
      this.storeProfileService.addStoreModalService.next(this.addStoreForm.value);
    } else {
      this.onNoClick();
      console.log('this.addStoreForm.value', this.addStoreForm.value);

    }
  });
  }

  // Image Preview
  showPreview(event) {
    this.hideImageCrop = false;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.mainImage = event.base64 as string;
    this.addStoreForm.patchValue({
      image_data: event.base64 as string
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
