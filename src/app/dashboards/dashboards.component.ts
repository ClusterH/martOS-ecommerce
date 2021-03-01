import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order, OrderStatus } from '../orders/models/order.model';
import { OrderService } from '../orders/services/order.service';
import { Store } from '../smart-stores/models/Store';
import { StoreService } from '../smart-stores/services/Store.service';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {
  pendingOrders: Order[];
  subscription: Subscription;
  selectedStore: Store;
  multiData = [{ img: '', name: 'sac porte croisse', price: 440.00 }, { img: '', name: 'sac porte croisse', price: 440.00 }];
  displayedColumns = ['name', 'price', 'quantity', 'total'];
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
  public options: any = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Monthly Average Temperature'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
}
  constructor(private ordersService: OrderService, private storeService: StoreService) { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
    this.subscription = this.storeService.selectedStore.subscribe((next: Store) => {
      if (next) {
        this.selectedStore = next;
        this.getOrders(OrderStatus.Pending);
      }
    });
  }
  getOrders(type) {
    this.ordersService.getOrders(this.selectedStore.referenceId, type).subscribe(next => {
      this.pendingOrders = next;
      this.pendingOrders.push(this.pickupOrder);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
