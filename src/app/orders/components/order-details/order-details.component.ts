import { Component, OnInit, Input } from '@angular/core';
import { Order, StoreOrderType } from '../../models/order.model';
import { MatDialog } from '@angular/material/dialog';
import { ArticleRemoveDialogComponent } from '../dialogs/article-remove-dialog/article-remove-dialog.component';
import { CancelOrderDialogComponent } from '../dialogs/candel-order-dialog/cancel-order-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() item: Order;
  StoreOrderType = StoreOrderType;
  displayedColumns = ['name', 'price', 'quantity', 'total', 'actions'];
  driverAnswer = '';
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  public removeAticle(order, article) {
    const dialogRef = this.dialog.open(ArticleRemoveDialogComponent, {
      data: {
        order,
        article
      },
      panelClass: 'order-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public cancelOrder(order) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      data: { order }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
