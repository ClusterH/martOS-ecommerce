import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from 'src/app/smart-stores/models/Store';
import { BusinessAddress } from 'src/app/store-profile/models/BusinessAddress';
import { StoreProfileService } from 'src/app/store-profile/services/store-profile.service';
import { StoresClient } from 'src/app/smart-stores/clients/StoresClient';
import { UserClient } from 'src/app/store-profile/clients/user.client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store-block',
  templateUrl: './store-block.component.html',
  styleUrls: ['./store-block.component.scss']
})
export class StoreBlockComponent implements OnInit, OnDestroy {
  @Input() store: Store;
  calledFor = '';
  businessAddress: BusinessAddress;
  isEdit = false;
  activeEditSubscription: Subscription;
  currentStore = null;

  constructor(
    private storeProfileService: StoreProfileService,
    private userClient: UserClient,
    private storesClient: StoresClient
  ) { }

  ngOnInit() {
    this.activeEditSubscription = this.storesClient.currentEditStore.subscribe(next => {
      if (next !== this.store.id) {
        this.isEdit = false;
        this.calledFor = '';
      }
    });
  }
  detailAction(store: Store) {

    if (this.businessAddress === undefined || this.businessAddress == null) {
      this.businessAddress = this.userClient.getStoredBusinessAddress();
      this.storeProfileService.changeBusinesAddress(this.businessAddress);
    }
    if (this.calledFor === 'detail') {
      this.calledFor = '';
    } else {
      this.calledFor = 'detail';
      this.currentStore = {...store};
    }
    this.storesClient.currentEditStore.next(this.store.id);
  }


  editAction(store: Store) {

    if (this.businessAddress === undefined || this.businessAddress === null) {
      this.businessAddress = this.userClient.getStoredBusinessAddress();
      this.storeProfileService.changeBusinesAddress(this.businessAddress);
    }
    if (this.calledFor === 'edit') {
      this.calledFor = '';
    } else {
      this.calledFor = 'edit';
      this.isEdit = true;
      this.storesClient.currentEditStore.next(this.store.id);
      this.currentStore = {...store};
    }
  }

  ngOnDestroy() {
    this.activeEditSubscription.unsubscribe();
  }

}
