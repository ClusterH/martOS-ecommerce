import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-candel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./cancel-order-dialog.component.scss']
})
export class CancelOrderDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
