import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProfileService } from '../../services/store-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentInfoUpdateComponent } from '../payment-info-update/payment-info-update.component';
import { PaymentClient } from '../../clients/payment.client';
import { CardInfo } from '../../models/CardInfo';
import { DeleteCardRequest } from '../../models/DeleteCardRequest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit, OnDestroy {

  isEdit: boolean = false;
  isCard: boolean = false;
  calledFor: string = '';
  isTabOpen: boolean = false;
  cardInfo: CardInfo;
  currentCardInfo: Subscription;
  // cardForm: FormGroup;

  constructor(
    private paymentClient: PaymentClient,
    private storeProfileService: StoreProfileService,
    public dialog: MatDialog
  ) { }

  ngOnDestroy() {
    if (this.currentCardInfo) {
      this.currentCardInfo.unsubscribe();
    }

    this.storeProfileService.changecard(null);
  }

  async ngOnInit() {
    this.cardInfo = <CardInfo>{
      id: "",
      number: `VISA`,
      expiry: `Exp. date`
    }
    this.currentCardInfo = this.storeProfileService.currentCardInfo.subscribe(val => {
      if (!val) {
        return;
      }

      this.cardInfo = val
    });

    (await this.paymentClient.getPayment()).subscribe((cardInfo) => {
      if (cardInfo == null || cardInfo == undefined) {
        // to delete
        this.cardInfo = <CardInfo>{
          id: "",
          number: `VISA`,
          expiry: `Exp. date`
        }
        this.storeProfileService.changecard(null);
        this.isCard == false;
      } else {
        this.cardInfo = <CardInfo>{
          id: cardInfo.id,
          number: `VISA ${cardInfo.number}`,
          expiry: `Exp. date ${cardInfo.expiry}`
        }

        this.storeProfileService.changecard(this.cardInfo);

        this.isCard == true;
      }
    });

    // this.cardForm = this.formBuilder.group({
    //   card_number: [''],
    //   expiry: ['']
    // });
    // this.storeProfileService.closeModalService.subscribe(
    //   res => {
    //     this.isEdit = false;
    //   }, err =>{
    //     console.log('err', err);
    //   }
    // );
  }

  addAction() {
    console.log(this.cardInfo)
    if (this.cardInfo == null || this.cardInfo.id == "") {

      this.isEdit = true;
      this.calledFor = 'add';
      console.log('this.calledFor', this.calledFor);
      this.openDialog();
    }
  }

  tabAction(value) {
    this.isTabOpen = value;
    this.isEdit = false;
  }

  // async editAction() {
  //   let request = <DeleteCardRequest>{
  //     id: this.cardInfo.id
  //   };

  //   (await this.paymentClient.delete(request)).subscribe((cardInfo) => {
  //     this.cardInfo = <CardInfo>{
  //       id: "",
  //       number: `VISA`,
  //       expiry: `Exp. date`
  //     }
  //     this.storeProfileService.changecard(this.cardInfo);
  //   });
  //   // this.isEdit = true;
  //   // this.calledFor = 'update';
  //   // console.log('this.calledFor', this.calledFor);
  //   // this.openDialog();
  // }
  deleteAction() {
    this.cardInfo = null;
  }

  openDialog() {
    const dialogRef = this.dialog.open(PaymentInfoUpdateComponent, {
      data: {
        'calledFor': this.calledFor,
        'isEdit': this.isEdit
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
