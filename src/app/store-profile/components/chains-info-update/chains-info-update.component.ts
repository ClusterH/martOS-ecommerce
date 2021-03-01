import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProfileService } from '../../services/store-profile.service';
import { ChainStoresClient } from '../../clients/chains.client';
import { ChainStore } from '../../models/ChainStore';
import { BusinessAddress } from '../../models/BusinessAddress';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chains-info-update',
  templateUrl: './chains-info-update.component.html',
  styleUrls: ['./chains-info-update.component.scss']
})
export class ChainsInfoUpdateComponent implements OnInit, OnDestroy {

  chainEditForm: FormGroup;
  chainStore: ChainStore;
  businessAddress: BusinessAddress;
  currentChainStore: Subscription;

  @Input() calledFor: string;

  constructor(
    private formBuilder: FormBuilder,
    private chainStoresClient: ChainStoresClient,
    private storeProfileService: StoreProfileService
  ) { }

  ngOnDestroy() {
    if(this.currentChainStore){
      this.currentChainStore.unsubscribe();
    }
    
     this.storeProfileService.changechain(null);
  }

  async ngOnInit() {

    this.currentChainStore = this.storeProfileService.currentChainStore.subscribe(val => {
      if (!val) {
        return;
      }

      console.log(val.name);
      this.chainStore = val
      this.chainEditForm = this.formBuilder.group({
        image_data: ['../../../../assets/images/add-image.svg'],
        display_name: [val.name],
        company_name: [''],
        siren_n: [''],
        address: [''],
        city: [''],
        postal_code: [''],
        country: ['']
      });

      this.storeProfileService.currentBusinessAddress.subscribe(async val => {
        if (!val) {
          return;
        }
        this.chainEditForm = this.formBuilder.group({
          image_data: ['../../../../assets/images/add-image.svg'],
          display_name: [this.chainStore.name],
          company_name: [val.businessName],
          siren_n: [val.businessNumber],
          address: [val.street],
          city: [val.city],
          postal_code: [val.postalCode],
          country: [val.country]
        });
      });
    });

    console.log(this.chainEditForm.getRawValue())
  }


  async updateChainAction() {
    console.log('update');
    this.chainStore.name = this.chainEditForm.get('display_name').value;

    return new Promise(async (resolve) => {
    (await this.chainStoresClient.update(this.chainStore)).subscribe(async (chains) => {
      resolve(chains);
      (await this.chainStoresClient.getAll()).subscribe((chains) => {
        resolve(chains);
        this.storeProfileService.changechains(chains);
      });
    });
    console.log(this.chainEditForm.value);
    this.closeModal();
  });
  }

  closeModal() {
    this.storeProfileService.closeChainUpdateModalService.next(false);
  }

}
