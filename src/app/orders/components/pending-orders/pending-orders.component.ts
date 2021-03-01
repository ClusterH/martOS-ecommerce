import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Observable} from 'rxjs';
import {Order , StoreOrderType} from '../../models/order.model';
import {MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {CancelOrderDialogComponent} from '../dialogs/candel-order-dialog/cancel-order-dialog.component';
// import {StoreOrderType} from '../../models/store-order-type.model';
import {ArticleRemoveDialogComponent} from '../dialogs/article-remove-dialog/article-remove-dialog.component';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
  public displayedColumns: any[];
  public activeLink: string;
  public orders$: Observable<Order[]>;
  public dataSource: MatTableDataSource<Order>;
  public pendingOrderNum: number;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) {
    this.activeLink = 'pending';
    this.displayedColumns = ['Articles', 'Elapsed Time', 'Delivery',  'Actions'];
  }

  ngOnInit() {
    this.loadOrders();
    // this.orderService.getOrders().subscribe( orders => {
    //   // console.log(orders);
    //   this.pendingOrderNum = orders.length;
    //   this.dataSource = new MatTableDataSource(orders);
    // });
    console.log(this.orders$);

  }
  private loadOrders() {
    // this.orders$ = this.orderService.getOrders();
  }

  public deliver() {

  }

  public cancelOrder(order) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      data: {order}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public removeAticle(order, article) {
    const dialogRef = this.dialog.open(ArticleRemoveDialogComponent, {
      data: {
        order,
        article
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getType(id: number): any {
    return StoreOrderType[id];
  }
  public onShowPendingOrder() {
    this.activeLink = 'pending';
    // this.dataSource = ..;
  }
  public onShowOngoingOrder() {
    this.activeLink = 'ongoing';
    // this.dataSource = ..;
  }
}
