import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StoreProfileService } from '../../services/store-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreInfoDaysComponent } from '../store-info-days/store-info-days.component';
import { AddImageStore, Store } from '../../../smart-stores/models/Store';
import { StoresClient } from '../../../smart-stores/clients/StoresClient';
import { UpdateStoreNameRequest } from '../../models/UpdateStoreNameRequest';
import { StoreEditAddressComponent } from '../store-edit-address/store-edit-address.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { resolve } from 'url';

@Component({
  selector: 'app-store-info-update',
  templateUrl: './store-info-update.component.html',
  styleUrls: ['./store-info-update.component.scss']
})
export class StoreInfoUpdateComponent implements OnInit, OnDestroy {

  @Input() calledFor: string;
  @Input() currentStore:Store;
  addDays: boolean = false;
  editStoreForm: FormGroup;
  pendingAddressVerification = false;
  mainImage: string;
  hideImageCrop = true;
  imageChangedEvent;
  currentStoreSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private storeProfileService: StoreProfileService,
    private storesClient: StoresClient
  ) { }

  ngOnInit() {
    this.editStoreForm = this.formBuilder.group({
      image_data: [''],
      display_name: [''],
      company_name: [''],
      email: [''],
      phone_number: [''],
      siren_n: [''],
      address: [''],
      city: [''],
      postal_code: [''],
      country: ['']
    });


    this.mainImage = null;
    this.mainImage = this.currentStore.imageUrl;

    this.storeProfileService.currentBusinessAddress.subscribe(val => {
      this.editStoreForm = this.formBuilder.group({
        display_name: [this.currentStore.name],
        company_name: [val.businessName],
        email: [val.email],
        phone_number: [val.phoneNumber],
        siren_n: [val.businessNumber],
        address: [this.currentStore.address],
        city: [this.currentStore.postalCode],
        postal_code: [this.currentStore.postalCode],
        country: [this.currentStore.country],
        image_data: [this.currentStore.imageUrl]
      });
    });

  }

  ngOnDestroy() {
    if (this.currentStoreSubscription) {
      this.currentStoreSubscription.unsubscribe();
    }

    this.storeProfileService.changestore(null);
  }

  addDaysAction() {
    // this.addDays = true;
    this.openDialog();
  }

  closeDaysAction() {
    this.addDays = false;
  }

  async editStoreFOrmSubmit() {
    const request: UpdateStoreNameRequest = {
      id: this.currentStore.id,
      name: this.editStoreForm.get('display_name').value,
      refStoreId: this.currentStore.referenceId
    };

    return new Promise(async (resolve) => {
    (await this.storesClient.updateName(request)).subscribe(async (val) => {
      resolve(val);
      const imgreques: AddImageStore = {
        country: 'France',
        refStoreId: this.currentStore.referenceId,
        base64: this.editStoreForm.get('image_data').value
      };

      (await this.storesClient.addStoreImage(imgreques)).subscribe(async next => {
        resolve(next);
        console.log(next);
      });

      (await this.storesClient.getComplete()).subscribe((stores) => {
        resolve(stores);
        this.storeProfileService.changestores(stores);
      });
    });

    console.log('this.editStoreForm.value', this.editStoreForm.value);
    this.closeUpdateModal();
  });
  }

  closeUpdateModal() {
    this.storeProfileService.closeStoreUpdateModalService.next(false);
  }

  openEditAddressDialogue() {
    const dialogRef = this.dialog.open(StoreEditAddressComponent, {
      data: {
        calledFor: this.calledFor
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // integrate API to request address change
      this.pendingAddressVerification = true;
      console.log({ result });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(StoreInfoDaysComponent, {
      data: {
        calledFor: this.calledFor
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  showPreview(event) {
    this.hideImageCrop = false;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log('cropped')
    let img: string = event.base64 as string;
    img = img.split(',')[1];
    this.mainImage = event.base64 as string;
    this.editStoreForm.patchValue({
      image_data: img
    });
  }
}
