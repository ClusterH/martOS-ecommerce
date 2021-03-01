import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/smart-stores/services/Store.service';
import { Store } from '../smart-stores/models/Store';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-subscription-fee',
  templateUrl: './subscription-fee.component.html',
  styleUrls: ['./subscription-fee.component.scss']
})
export class SubscriptionFeeComponent implements OnInit {
  activeTab = 'subscriptions';
  subscription: Subscription;
  selectedStore: Store;

  constructor(
    private storeService: StoreService
  ) {
    
  }

  ngOnInit() {
    this.subscription = this.storeService.selectedStore.subscribe((next: Store) => {
      if (next) {
        this.selectedStore = next;
      }
    });
  }

  onTabChange(section) {
    this.activeTab = section;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
