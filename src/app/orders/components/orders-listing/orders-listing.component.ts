import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderStatus, Order } from '../../models/order.model';
import { Store } from 'src/app/smart-stores/models/Store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-orders-listing',
  templateUrl: './orders-listing.component.html',
  styleUrls: ['./orders-listing.component.scss']
})
export class OrdersListingComponent implements OnInit {
  @Input() type: OrderStatus;
  @Output() selectedOrder: EventEmitter<Order> = new EventEmitter<Order>();
  @Input() selectedItem: Order;
  @Input() orderList: Order[];
  selectedStore: Store;
  selectedStoreObservable: Observable<any>;

  constructor() { }

  ngOnInit() {

  }
}
