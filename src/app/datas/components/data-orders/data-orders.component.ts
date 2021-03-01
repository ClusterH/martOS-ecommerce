import { select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { OrdersData } from '../../models/datas.model';
import { DatasService } from '../../services/datas.service';
import { StoreService } from 'src/app/smart-stores/services/Store.service';
import { Store } from '../../../smart-stores/models/Store';
import { Subscription } from 'rxjs/internal/Subscription';
import { group } from '@angular/animations';

@Component({
  selector: 'app-data-orders',
  templateUrl: './data-orders.component.html',
  styleUrls: ['./data-orders.component.scss']
})
export class DataOrdersComponent implements OnInit {
  displayedColumns = ['date', 'orderNumber', 'articles', 'taxes', 'paymentFee', 'deliveryFee', 'incomeExclT', 'incomeInclT', 'actions'];
  displayedFooterColumns = ['prev', 'showmore', 'next'];
  items: OrdersData[];
  tempItems: OrdersData[];
  searchTotalItems: OrdersData[];
  subscription: Subscription;
  selectedStore: Store;
  pageRows = 0;
  monthCounter = 0;
  yearCounter = 0;
  startDate: Date;
  endDate: Date;
  selectedItem = "monthly";

  constructor(
    private ordersService: DatasService,
    private storeService: StoreService) { 
      this.tempItems = this.ordersService.getOrdersData();
      this.monthCounter = this.ordersService.currentMonth;
      this.yearCounter = this.ordersService.currentYear;
      this.startDate = new Date(this.yearCounter, this.monthCounter, 1);
      this.endDate = new Date(this.yearCounter, this.monthCounter + 1, 0);
    }

  ngOnInit() {
    this.getOrderDatas();
  }

  getOrderDatas() {
    this.searchTotalItems = _.filter(this.tempItems, (elem) => {
      const d = new Date(elem.date);
      return this.startDate <= d && this.endDate >= d;
    });
    this.items = this.searchTotalItems.slice(0, (this.pageRows + 1) * 8);
  }

  getTotalArticles() {
    return this.searchTotalItems.map(t => t.articles).reduce((acc, value) => acc + value, 0);
  }
  getTotalTaxes() {
    return this.searchTotalItems.map(t => t.taxes).reduce((acc, value) => acc + value, 0);
  }
  getTotalPaymentFee() {
    return this.searchTotalItems.map(t => t.paymentFee).reduce((acc, value) => acc + value, 0);
  }
  getTotalDeliveryFee() {
    return this.searchTotalItems.map(t => t.deliveryFee).reduce((acc, value) => acc + value, 0);
  }
  getTotalIncomeExclT() {
    return this.searchTotalItems.map(t => t.incomeExclT).reduce((acc, value) => acc + value, 0);
  }
  getTotalIncomeInclT() {
    return this.searchTotalItems.map(t => t.incomeInclT).reduce((acc, value) => acc + value, 0);
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
    this.yearCounter = this.ordersService.currentYear;
    this.monthCounter = this.ordersService.currentMonth;
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
