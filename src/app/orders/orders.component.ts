import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from './services/order.service';
import { OrderStatus, Order } from './models/order.model';
import { StoreService } from 'src/app/smart-stores/services/Store.service';
import { Store } from '../smart-stores/models/Store';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  OrderStatus = OrderStatus;
  ongoingSection: false;
  pendingSection: true;
  activeTab = 'pending';
  selectedOrder: Order;
  subscription: Subscription;
  selectedStore: Store;
  pendingOrders: Order[];
  ongoingOrders: Order[];
  pickupOrder: Order = {
    'id': 'hldj2154dzdd',
    'referenceStoreId': 'cf7c9ed2-5d40-49f2-a1c3-20efbff75b45',
    'price': 0,
    'vat': 0,
    'totalPrice': 130,
    'created': '2020-08-26T02:21:26.733Z',
    'orderStatus': 0,
    'storeOrderType': 0,
    'articles': [
      {

        'name': 'armani belt',
        'brand': 'armani',
        'minimumStock': 0,
        'price': '30',
        'itemId': 0,
        'totalStock': 0,
        'options': [
          {
            'name': 'color',
            'value': 'brown'
          },
          {
            'name': 'size',
            'value': '22'
          }
        ],
        'categories': [
          {
            'name': 'cloth',
            'value': 'belt'
          }
        ]
      },
      {

        'name': 'calvin klein shirt',
        'brand': 'Levis',
        'minimumStock': 0,
        'price': '45',
        'itemId': 0,
        'totalStock': 0,
        'options': [
          {
            'name': 'color',
            'value': 'white'
          },
          {
            'name': 'size',
            'value': 'S'
          }
        ],
        'categories': [
          {
            'name': 'cloth',
            'value': 'shirts'
          }
        ]
      },
      {
        'name': 'Levis shoes',
        'brand': 'Levis',
        'minimumStock': 0,
        'price': '55',
        'itemId': 0,
        'totalStock': 0,
        'options': [
          {
            'name': 'color',
            'value': 'pink'
          },
          {
            'name': 'size',
            'value': '42'
          }
        ],
        'categories': [
          {
            'name': 'cloth',
            'value': 'shoes'
          }
        ]
      }
    ]
  };
  constructor(private ordersService: OrderService, private storeService: StoreService) {

  }

  ngOnInit() {
    this.subscription = this.storeService.selectedStore.subscribe((next: Store) => {
      if (next) {
        this.selectedStore = next;
        this.getOrders(OrderStatus.Pending);
        this.getOrders(OrderStatus.OnGoing);
      }
    });
  }
  onTabChange(section) {
    this.activeTab = section;
    this.selectedOrder = null;
  }
  selectOrder(order: Order) {
    this.selectedOrder = order;
  }

  getOrders(type) {
    this.ordersService.getOrders(this.selectedStore.referenceId, type).subscribe(next => {
      console.log(next);
      if (type === OrderStatus.Pending) {
        this.pendingOrders = next;
        this.pendingOrders.push(this.pickupOrder);
      } else {
        this.ongoingOrders = next;
      }
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
