import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/orders/models/order.model';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss']
})
export class OrdersItemComponent implements OnInit {
  @Input() item: Order;
  @Input() selectedItem: Order;
  constructor() {
    console.log(this.item);
  }

  ngOnInit() {
    console.log('item', this.item);
  }

}
