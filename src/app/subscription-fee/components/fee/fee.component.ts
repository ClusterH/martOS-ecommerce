import { Component, OnInit } from '@angular/core';
import { FeeData } from '../../models';
import { SubscriptionFeeService } from '../../services/subscription-fee.service';
import { StoreService } from 'src/app/smart-stores/services/Store.service';
import { Store } from '../../../smart-stores/models/Store';
import { Subscription } from 'rxjs/internal/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {
  displayedColumns = ['date', 'invoiceNumber', 'stores', 'transferBef', 'paymentFee', 'deliveryFee', 'finalTransfer', 'invoiceAction', 'downloadAction'];
  displayedFooterColumns = ['prev', 'showmore', 'next'];
  items: FeeData[];
  tempItems: FeeData[];
  searchTotalItems: FeeData[];
  subscription: Subscription;
  selectedStore: Store;
  pageRows = 0;
  monthCounter = 0;
  yearCounter = 0;
  startDate: Date;
  endDate: Date;
  selectedItem = "monthly";


  constructor(
    private subscriptionService: SubscriptionFeeService,
    private storeService: StoreService) { 
      this.tempItems = this.subscriptionService.getFeeData();
      this.monthCounter = this.subscriptionService.currentMonth;
      this.yearCounter = this.subscriptionService.currentYear;
      this.startDate = new Date(this.yearCounter, this.monthCounter, 1);
      this.endDate = new Date(this.yearCounter, this.monthCounter + 1, 0);
    }

  ngOnInit() {
    this.getOrderDatas();
  }

  getTotalTransferBef() {
    return this.searchTotalItems.map(t => t.transferBef).reduce((acc, value) => acc + value, 0);
  }
  getTotalPaymentFee() {
    return this.searchTotalItems.map(t => t.paymentFee).reduce((acc, value) => acc + value, 0);
  }
  getTotalDeliveryFee() {
    return this.searchTotalItems.map(t => t.deliveryFee).reduce((acc, value) => acc + value, 0);
  }
  getTotalFinalTransfer() {
    return this.searchTotalItems.map(t => t.finalTransfer).reduce((acc, value) => acc + value, 0);
  }

  getOrderDatas() {
    this.searchTotalItems = _.filter(this.tempItems, (elem) => {
      const d = new Date(elem.date);
      return this.startDate <= d && this.endDate >= d;
    });
    this.items = this.searchTotalItems.slice(0, (this.pageRows + 1) * 8);
  }

  pagenationNavigate(type: string) {
    this.pageRows = 0;
    if(this.selectedItem == "yearly") {
      if(type == 'prev') {
        this.yearCounter--;
      }
      else if(type == 'next') {
        this.yearCounter++;
      }
      this.startDate = new Date(this.yearCounter, 1, 1);
      this.endDate = new Date(this.yearCounter, 12, 31);
      this.getOrderDatas();
    }
    else if(this.selectedItem == "monthly") {
      if(type == 'prev') {
        if(this.monthCounter == 0) {
          this.yearCounter--;
          this.monthCounter = 11;
        }
        else {
          this.monthCounter--;
        }
      }
      else if(type == 'next') {
        if(this.monthCounter == 11){
          this.yearCounter++;
          this.monthCounter = 1;
        }
        else{
          this.monthCounter++;
        }
      }
      this.startDate = new Date(this.yearCounter, this.monthCounter, 1);
      this.endDate = new Date(this.yearCounter, this.monthCounter + 1, 0);
      this.getOrderDatas();
    }
  }

  selectionChanged(item) {
    this.selectedItem = item.value;
    this.pageRows = 0;
    this.yearCounter = this.subscriptionService.currentYear;
    this.monthCounter = this.subscriptionService.currentMonth;
    this.startDate = new Date(this.yearCounter, this.monthCounter, 1);
    this.endDate = new Date(this.yearCounter, this.monthCounter + 1, 0);

    this.getOrderDatas();
  }

  showMore() {
    if(Math.floor(this.items.length / 8) > this.pageRows) {
      this.pageRows++;
    }
    this.getOrderDatas();
  }

  dateChange(event) {
    this.pageRows = 0;
    this.startDate = new Date(event.value[0]);
    this.endDate = new Date(event.value[1]);
    this.getOrderDatas();
  }

}
